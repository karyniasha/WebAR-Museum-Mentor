import './style.css'

const targetFileUrl = `${import.meta.env.BASE_URL}targets/targets.mind`
const mindarModuleUrl =
  'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js'
const mindarModule = import(/* @vite-ignore */ mindarModuleUrl)

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
      <p class="camera-message" role="status" aria-live="polite"></p>
    </section>
  </main>
`

const startButton = document.querySelector('.start-button')
const cameraPreview = document.querySelector('.camera-preview')
const cameraMessage = document.querySelector('.camera-message')

startButton.addEventListener('click', async () => {
  startButton.disabled = true
  cameraMessage.textContent = ''
  cameraPreview.hidden = false

  try {
    const { MindARThree } = await mindarModule
    const mindarThree = new MindARThree({
      container: cameraPreview,
      imageTargetSrc: targetFileUrl,
    })
    const { renderer, scene, camera } = mindarThree
    const anchor = mindarThree.addAnchor(0)

    anchor.onTargetFound = () => {
      cameraMessage.textContent = 'Изображение распознано'
      console.log('MindAR target found')
    }
    anchor.onTargetLost = () => {
      cameraMessage.textContent = 'Наведите камеру на изображение'
      console.log('MindAR target lost')
    }

    await mindarThree.start()
    renderer.setAnimationLoop(() => renderer.render(scene, camera))
    startButton.hidden = true
  } catch {
    cameraPreview.hidden = true
    cameraMessage.textContent = 'Не удалось запустить MindAR. Проверьте разрешение на камеру.'
    startButton.disabled = false
  }
})
