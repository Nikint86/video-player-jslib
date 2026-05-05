# Библиотека для создания видеоплеера

> 👉 **Живая демонстрация:** [посмотреть как работает плеер](file:///C:/Users/Nikint/Desktop/video-player-jslib/index.html)  

Минимальный набор инструментов, который нужен для создания своего видеоплеера. Все элементы можно кастомизировать на свой вкус и цвет.

![max example](screenshots/max.gif)

Построен на базе библиотеки [Playable](https://wix.github.io/playable/).

## Примеры

Два рабочих примера:

- Страница с минимальными настройками — [example_min.html](./example_min.html)
- Страница с максимальными настройками — [example_max.html](./example_max.html)

## Как подключить

JS код поставляется в виде одного файла `player.js`, который нужно скачать из этого репозитория. Для работы он требует двух библиотек - [jQuery](https://jquery.com/) и [Playable](https://wix.github.io/playable/). Пример подключения в браузере:

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://unpkg.com/playable@2.10.3/dist/statics/playable.bundle.min.js"></script>
<script src="player.js"></script>
```
