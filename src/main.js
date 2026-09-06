import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="welcome-screen">
    <section class="welcome-card" aria-labelledby="page-title">
      <p class="eyebrow">Museum experience</p>
      <h1 id="page-title">WebAR Museum Mentor</h1>
      <p class="description">
        Наведите камеру на музейное изображение, чтобы увидеть историческую сцену.
      </p>
      <button class="start-button" type="button">Запустить</button>
      <div class="camera-preview" hidden>
        <video class="camera-video" autoplay playsinline muted></video>
      </div>
      <p class="camera-message" role="status" aria-live="polite"></p>
    </section>
  </main>
`

const startButton = document.querySelector('.start-button')
const cameraPreview = document.querySelector('.camera-preview')
const cameraVideo = document.querySelector('.camera-video')
const cameraMessage = document.querySelector('.camera-message')

startButton.addEventListener('click', async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraMessage.textContent = 'Камера не поддерживается этим браузером.'
    return
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    })

    cameraVideo.srcObject = stream
    cameraPreview.hidden = false
    cameraMessage.textContent = ''
    startButton.hidden = true
  } catch {
    cameraMessage.textContent = 'Не удалось получить доступ к камере. Проверьте разрешения браузера.'
  }
})
