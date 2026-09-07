import './style.css'

const targetFileUrl = `${import.meta.env.BASE_URL}targets/targets.mind`
const contentImageUrl = `${import.meta.env.BASE_URL}content/test%202.jpg`
const mindarModuleUrl =
  'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js'
const mindarModule = import(/* @vite-ignore */ mindarModuleUrl)
const threeModuleName = 'three'
const threeModule = import(/* @vite-ignore */ threeModuleName)

mindarModule
  .then(({ MindARThree }) => {
    console.info('MindARThree успешно импортирован.', { MindARThree, targetFileUrl })
  })
  .catch(() => {
    console.warn('Не удалось импортировать MindARThree.')
  })

document.querySelector('#app').innerHTML = `
  <main class="welcome-screen">
    <section class="welcome-card" aria-labelledby="page-title">
      <p class="eyebrow">Museum experience</p>
      <h1 id="page-title">WebAR Museum Mentor</h1>
      <p class="description">
        Наведите камеру на музейное изображение, чтобы увидеть историческую сцену.
      </p>
      <button class="start-button" type="button">Запустить</button>
      <div class="camera-preview" hidden></div>
      <button class="close-button" type="button" hidden>Закрыть AR</button>
      <p class="camera-message" role="status" aria-live="polite"></p>
    </section>
  </main>
`

const startButton = document.querySelector('.start-button')
const closeButton = document.querySelector('.close-button')
const cameraPreview = document.querySelector('.camera-preview')
const cameraMessage = document.querySelector('.camera-message')
let mindarThree
let renderer
let scene
let camera

startButton.addEventListener('click', async () => {
  startButton.disabled = true
  cameraMessage.textContent = ''
  cameraPreview.hidden = false
  document.body.classList.add('ar-active')

  try {
    if (!mindarThree) {
      const [{ MindARThree }, THREE] = await Promise.all([mindarModule, threeModule])
      mindarThree = new MindARThree({
        container: cameraPreview,
        imageTargetSrc: targetFileUrl,
      })
      renderer = mindarThree.renderer
      scene = mindarThree.scene
      camera = mindarThree.camera
      const anchor = mindarThree.addAnchor(0)
      const texture = await new THREE.TextureLoader().loadAsync(contentImageUrl)
      const { width, height } = texture.image
      const aspectRatio = width / height
      const geometry = new THREE.PlaneGeometry(0.78, 0.78 / aspectRatio)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      })
      const plane = new THREE.Mesh(geometry, material)

      anchor.group.add(plane)

      anchor.onTargetFound = () => {
        cameraMessage.textContent = 'Изображение распознано'
        console.log('MindAR target found')
      }
      anchor.onTargetLost = () => {
        cameraMessage.textContent = 'Наведите камеру на изображение'
        console.log('MindAR target lost')
      }
    }

    await mindarThree.start()
    cameraMessage.textContent = 'Наведите камеру на изображение'
    renderer.setAnimationLoop(() => renderer.render(scene, camera))
    startButton.hidden = true
    closeButton.hidden = false
  } catch {
    document.body.classList.remove('ar-active')
    cameraPreview.hidden = true
    cameraMessage.textContent = 'Не удалось запустить MindAR. Проверьте разрешение на камеру.'
    startButton.disabled = false
  }
})

closeButton.addEventListener('click', () => {
  mindarThree.stop()
  renderer.setAnimationLoop(null)
  document.body.classList.remove('ar-active')
  cameraPreview.hidden = true
  cameraMessage.textContent = ''
  startButton.hidden = false
  startButton.disabled = false
  closeButton.hidden = true
})
