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

  const playerContainer = document.getElementById(elementId);

  if (!playerContainer) {
    throw Error(`Element with id "${elementId}" not found.`);
  }

  const videoContainers = playerContainer.getElementsByClassName('js-video-container');
  if (!videoContainers.length) {
    throw Error(`Element with class "js-video-container" not found.`);
  }

  const videoContainer = videoContainers[0];
  player.attachToElement(videoContainer);

  const playBtn = playerContainer.querySelector('.js-play-button');
  const pauseBtn = playerContainer.querySelector('.js-pause-button');
  const volumeBtn = playerContainer.querySelector('.js-volume-button');
  const muteBtn = playerContainer.querySelector('.js-mute-button');
  const fullscreenBtn = playerContainer.querySelector('.js-fullscreen-button');
  const currentTimeSpan = playerContainer.querySelector('.js-current-time');
  const durationSpan = playerContainer.querySelector('.js-duration');
  const progressBar = playerContainer.querySelector('.js-progress');
  const progressSlider = playerContainer.querySelector('.js-progress-slider');

  // ========== PLAY / PAUSE ==========
  function updatePlayPauseButtons(isPlaying) {
    if (playBtn) playBtn.hidden = isPlaying;
    if (pauseBtn) pauseBtn.hidden = !isPlaying;
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => player.play());
  }
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => player.pause());
  }

  player.on(Playable.ENGINE_STATES.PLAYING, () => updatePlayPauseButtons(true));
  player.on(Playable.ENGINE_STATES.PAUSED, () => updatePlayPauseButtons(false));
  player.on(Playable.ENGINE_STATES.ENDED, () => {
    player.reset();
    updatePlayPauseButtons(false);
  });
  updatePlayPauseButtons(false);

  // ========== VOLUME / MUTE  ==========
  if (volumeBtn) {
    volumeBtn.addEventListener('click', () => {
      player.setVolume(0);
      volumeBtn.hidden = true;
      muteBtn.hidden = false;
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      player.setVolume(100);
      volumeBtn.hidden = false;
      muteBtn.hidden = true;
    });
  }

  player.setVolume(100);
  if (volumeBtn) volumeBtn.hidden = false;
  if (muteBtn) muteBtn.hidden = true;

  // ========== FULLSCREEN ==========
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      player.enterFullScreen();
    });
  }

  // ========== TIMER & PROGRESS ==========
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimerAndProgress() {
    const current = player.getCurrentTime();
    const duration = player.getDuration();
    if (currentTimeSpan) currentTimeSpan.textContent = formatTime(current);
    if (durationSpan && duration) durationSpan.textContent = formatTime(duration);
    if (progressSlider && duration) {
      const percent = (current / duration) * 100;
      progressSlider.style.width = `${percent}%`;
    }
  }

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const duration = player.getDuration();
      if (!duration) return;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      player.seekTo(percent * duration);
    });
  }

  let updateInterval = null;
  player.on(Playable.ENGINE_STATES.PLAYING, () => {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(updateTimerAndProgress, 200);
  });
  player.on(Playable.ENGINE_STATES.PAUSED, updateTimerAndProgress);
  player.on(Playable.ENGINE_STATES.ENDED, () => {
    if (updateInterval) clearInterval(updateInterval);
    updateTimerAndProgress();
  });
  player.on(Playable.VIDEO_EVENTS.LOADED_METADATA, updateTimerAndProgress);
  player.on(Playable.VIDEO_EVENTS.SEEKED, updateTimerAndProgress);

  updateTimerAndProgress();
}