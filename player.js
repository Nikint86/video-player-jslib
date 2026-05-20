function createPlayer({
  elementId,
  src = 'https://dvmn.org/media/filer_public/78/db/78db3456-3fd3-4504-9ed9-d2d1fd843c0b/highest_peak.mp4'
}) {
  const player = Playable.create({
    fillAllSpace: true,
    src: src,
    hideOverlay: true,
    hideMainUI: true,
  });

  const playerContainer = document.getElementById(elementId)

  if (!playerContainer) {
    throw Error(`Element with id "${elementId}" not found.`);
  }

  const videoContainers = playerContainer.getElementsByClassName('js-video-container');

  if (!videoContainers.length) {
    throw Error(`Element with class "js-video-container" not found.`);
  }

  if (videoContainers.length > 1) {
    throw Error(`Expects single element with class "js-video-container", but ${videoContainers.length} were found.`);
  }

  const videoContainer = videoContainers[0];
  player.attachToElement(videoContainer);

  const $playerContainer = $(playerContainer);

  // ========== PLAY / PAUSE ==========
  (function activatePlayButtons() {
    const $playButton = $playerContainer.find('.js-play-button');
    const $pauseButton = $playerContainer.find('.js-pause-button');

    if ($playButton.length) {
      $playButton.click(() => player.play());
    }
    if ($pauseButton.length) {
      $pauseButton.click(() => player.pause());
    }

    function activatePlayBtn() {
      if ($playButton.length) $playButton.attr("hidden", false);
      if ($pauseButton.length) $pauseButton.attr("hidden", true);
    }

    function activatePauseBtn() {
      if ($playButton.length) $playButton.attr("hidden", true);
      if ($pauseButton.length) $pauseButton.attr("hidden", false);
    }

    activatePlayBtn();

    player.on(Playable.ENGINE_STATES.PLAYING, activatePauseBtn);
    player.on(Playable.ENGINE_STATES.PAUSED, activatePlayBtn);
    player.on(Playable.ENGINE_STATES.ENDED, () => {
      player.reset();
      activatePlayBtn();
    });
  })();

  // ========== MUTE / VOLUME ==========
  (function activateVolumeButtons() {
    const $volumeButton = $playerContainer.find('.js-volume-button');
    const $muteButton = $playerContainer.find('.js-mute-button');

    if ($volumeButton.length) {
      $volumeButton.click(() => player.setVolume(100));
    }
    if ($muteButton.length) {
      $muteButton.click(() => player.setVolume(0));
    }

    function activateVolumeButton() {
      if ($volumeButton.length) $volumeButton.attr("hidden", false);
      if ($muteButton.length) $muteButton.attr("hidden", true);
    }

    function activateMuteBtn() {
      if ($volumeButton.length) $volumeButton.attr("hidden", true);
      if ($muteButton.length) $muteButton.attr("hidden", false);
    }

    function toggleVolumeMuteBtns() {
      if (player.getVolume() > 0) {
        activateMuteBtn();
      } else {
        activateVolumeButton();
      }
    }

    player.on(Playable.VIDEO_EVENTS.VOLUME_CHANGED, toggleVolumeMuteBtns);
    toggleVolumeMuteBtns();
  })();

  // ========== FULLSCREEN ==========
  const $fullscreenButton = $playerContainer.find('.js-fullscreen-button');
  if ($fullscreenButton.length) {
    $fullscreenButton.click(() => player.enterFullScreen());
  }
}