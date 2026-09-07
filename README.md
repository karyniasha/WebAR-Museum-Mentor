# WebAR Museum Mentor

Учебный MVP музейной WebAR-сцены с распознаванием изображения.

## Сценарий работы

QR → сайт → «Запустить» → камера → распознавание изображения → AR-контент → «Закрыть AR».

## Технологии

- HTML
- CSS
- JavaScript
- Node.js
- Vite
- MindAR
- Three.js
- Git
- GitHub
- GitHub Actions
- GitHub Pages

## Структура проекта

- `index.html` — основная HTML-страница и import map для библиотек.
- `src/main.js` — логика стартового экрана, запуска и остановки MindAR, image tracking и AR-контента.
- `src/style.css` — стили стартового и полноэкранного AR-режимов.
- `public/targets/targets.mind` — файл image target для MindAR.
- `public/content/test 2.jpg` — тестовое изображение, которое показывается поверх target.
- `vite.config.js` — настройка base-пути для GitHub Pages.
- `.github/workflows/deploy.yml` — workflow сборки и публикации GitHub Pages.

## Локальный запуск

```powershell
npm.cmd install
npm.cmd run dev
```

`npm.cmd install` устанавливает зависимости проекта.

`npm.cmd run dev` запускает локальный сервер разработки Vite.

## Production build

```powershell
npm.cmd run build
```

Команда создаёт production-сборку в папке `dist`.

## Публикация

Push в ветку `main` запускает GitHub Actions. Workflow устанавливает зависимости, собирает проект и публикует содержимое `dist` в GitHub Pages.

## Рабочий сайт

[https://karyniasha.github.io/WebAR-Museum-Mentor/](https://karyniasha.github.io/WebAR-Museum-Mentor/)

## Ограничения MVP

- одна AR-сцена;
- один image target;
- простой 2.5D-контент;
- без backend;
- без базы данных;
- без volumetric video.
