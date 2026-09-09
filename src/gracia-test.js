import {
  GraciaPlayer,
  SplatsMesh,
  loadGraciaModule,
  OrbitControls,
  THREE,
} from '@gracia/web-sdk/aio'

const viewer = document.querySelector('#viewer')
const status = document.querySelector('#status')

function showError(error) {
  console.error(error)
  const message = error instanceof Error ? error.message : String(error)
  status.textContent = `Error: ${message}`
}

if (!navigator.gpu) {
  status.textContent = 'WebGPU unavailable'
} else {
  initialize().catch(showError)
}

async function initialize() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  viewer.append(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1000)
  camera.position.set(0, 0, 3)

  const orbit = new OrbitControls(camera, renderer.domElement)
  orbit.target.set(0, 0, 0)
  orbit.update()

  function resize() {
    const { clientWidth: width, clientHeight: height } = viewer
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', resize)
  resize()
const GraciaModule = await loadGraciaModule(__GRACIA_MODULE_URL__)
  const player = await GraciaPlayer.create(
    opts =>
      GraciaModule({
        ...opts,
        print: console.log,
        printErr: console.error,
      }),
    {
      gl: renderer.getContext(),
      backend: 'hybrid',
    },
  )

  const splats = new SplatsMesh(player)
  splats.enableMesh = true
  scene.add(splats)

  const source = new URLSearchParams(window.location.search).get('source')

  if (source) {
    await player.open({ url: source })
    player.play()
    status.textContent = 'Gracia playing'
  } else {
    status.textContent = 'Gracia ready — add ?source=<mint-url>'
  }

  function animate() {
    requestAnimationFrame(animate)
    orbit.update()
    renderer.render(scene, camera)
  }

  animate()
}
