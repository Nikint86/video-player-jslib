# Библиотека для создания видеоплеера

> 👉 **Живая демонстрация:** [посмотреть как работает плеер](https://nikint86.github.io/video-player-jslib/). 

Минимальный набор инструментов, который нужен для создания своего видеоплеера. Все элементы можно кастомизировать на свой вкус и цвет.

![max example](screenshots/max.gif)

Построен на базе библиотеки [Playable](https://wix.github.io/playable/).

## Примеры

Два рабочих примера:

- Страница с минимальными настройками — [example_min.html](./example_min.html)
- Страница с максимальными настройками — [example_max.html](./example_max.html)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Видеоплеер</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        #player {
            width: 90%;
            max-width: 1100px;
            background: black;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        .js-video-container {
            width: 100%;
            aspect-ratio: 16 / 9;
        }
        .controls-panel {
            background: black;
            padding: 16px 20px;
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .player-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 28px;
            width: 52px;
            height: 52px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }
        .player-button:hover {
            background: rgba(255,255,255,0.1);
        }
        .js-fullscreen-button {
            margin-left: auto;
        }
    </style>
</head>
<body>
<div id="player">
    <div class="js-video-container"></div>
    <div class="controls-panel">
        <button class="js-play-button player-button">▶</button>
        <button class="js-pause-button player-button" hidden>⏸</button>
        <button class="js-mute-button player-button">🔇</button>
        <button class="js-volume-button player-button" hidden>🔊</button>
        <button class="js-fullscreen-button player-button">⛶</button>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://unpkg.com/playable@2.10.3/dist/statics/playable.bundle.min.js"></script>
<script src="player.js"></script>

<script>
    createPlayer({
        elementId: 'player',
        src: 'https://dvmn.org/media/filer_public/d0/16/d016d9b8-4180-4bb9-ad83-0241f61627b8/samsung_demo_-_alive_in_color.mp4'
    });
</script>
</body>
</html>

## Как подключить

JS код поставляется в виде одного файла `player.js`, который нужно скачать из этого репозитория. Для работы он требует двух библиотек - [jQuery](https://jquery.com/) и [Playable](https://wix.github.io/playable/). Пример подключения в браузере:

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://unpkg.com/playable@2.10.3/dist/statics/playable.bundle.min.js"></script>
<script src="player.js"></script>
```
