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
    </section>
  </main>
`
