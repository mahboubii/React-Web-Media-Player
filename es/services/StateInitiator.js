var DEFAULT_WIDTH = 560;
var DEFAULT_HEIGHT = 315;
var DEFAULT_ALLOW_FULL_FRAME = true;
var DEFAULT_VOLUME = 1.0;
var DEFAULT_COLOR = 'rgb(96, 157, 255)';
var DEFAULT_VINYL_RPM = 33;

var initSlideshowPlayerState = function initSlideshowPlayerState(options) {
  var state = {};
  state.hasAudio = false;
  state.hasSlideshow = true;
  state.hasVideo = false;
  state.hasVinyl = false;
  state.isSlideshowReady = false;
  state.imageDisplayed = null;

  if (options.slideshow.slice(-1)[0].endTime === undefined) {
    throw new Error("No time specified for slideshow");
  }

  state.duration = options.slideshow.slice(-1)[0].endTime;
  state.slideshow = options.slideshow;
  return state;
};

var initAudioSlideshowPlayerState = function initAudioSlideshowPlayerState(options) {
  var state = {};
  state.hasAudio = true;
  state.hasSlideshow = true;
  state.hasVideo = false;
  state.hasVinyl = false;
  state.isSlideshowReady = false;
  state.isAudioReady = false;
  state.imageDisplayed = null;

  if (options.slideshow.slice(-1)[0].endTime === undefined) {
    throw new Error("No time specified for slideshow");
  }

  state.duration = options.slideshow.slice(-1)[0].endTime;
  state.slideshow = options.slideshow;
  state.audio = options.audio;
  return state;
};

var initVideoPlayerState = function initVideoPlayerState(options) {
  var state = {};
  state.hasVideo = true;
  state.hasAudio = false;
  state.hasSlideshow = false;
  state.hasVinyl = false;
  state.isVideoReady = false;
  state.duration = 0;
  state.video = options.video;
  return state;
};

var initAudioVinylPlayerState = function initAudioVinylPlayerState(options) {
  var state = {};
  state.hasAudio = true;
  state.hasSlideshow = false;
  state.hasVideo = false;
  state.hasVinyl = true;
  state.isAudioReady = false;
  state.isVinylReady = false;
  state.duration = 0;
  state.audio = options.audio;

  if (!options.vinyl.hasOwnProperty("img")) {
    throw new Error("Please pass an image link through the img property of the vinyl option");
  }

  if (options.vinyl.hasOwnProperty("rpm")) {
    state.rpm = options.vinyl.rpm;
  } else {
    state.rpm = DEFAULT_VINYL_RPM;
  }

  state.vinyl = options.vinyl.img;
  return state;
};

var initAudioPlayerState = function initAudioPlayerState(options) {
  var state = {};
  state.hasAudio = true;
  state.hasSlideshow = false;
  state.hasVideo = false;
  state.hasVinyl = true;
  state.isAudioReady = false;
  state.isVinylReady = false;
  state.duration = 0;
  state.audio = options.audio;
  state.rpm = 0;
  state.vinyl = options.thumbnail;
  return state;
};

var getInitState = function getInitState(options) {
  if (options === undefined) {
    throw new Error("No options given to the player !");
  }

  var state = {};

  if (options.hasOwnProperty("video") && !options.hasOwnProperty("slideshow") && !options.hasOwnProperty("audio") && !options.hasOwnProperty("vinyl")) {
    state = initVideoPlayerState(options);
  } else if (!options.hasOwnProperty("video") && options.hasOwnProperty("slideshow") && options.hasOwnProperty("audio") && !options.hasOwnProperty("vinyl")) {
    state = initAudioSlideshowPlayerState(options);
  } else if (!options.hasOwnProperty("video") && options.hasOwnProperty("slideshow") && !options.hasOwnProperty("audio") && !options.hasOwnProperty("vinyl")) {
    state = initSlideshowPlayerState(options);
  } else if (!options.hasOwnProperty("video") && !options.hasOwnProperty("slideshow") && options.hasOwnProperty("audio") && options.hasOwnProperty("vinyl")) {
    state = initAudioVinylPlayerState(options);
  } else if (!options.hasOwnProperty("video") && !options.hasOwnProperty("slideshow") && options.hasOwnProperty("audio") && !options.hasOwnProperty("vinyl")) {
    state = initAudioPlayerState(options);
  } else {
    throw new Error("Combination impossible");
  }

  if (options.hasOwnProperty("height")) {
    state.height = options.height;
  } else {
    state.height = DEFAULT_HEIGHT;
  }

  if (options.hasOwnProperty("width")) {
    state.width = options.width;
  } else {
    state.width = DEFAULT_WIDTH;
  }

  if (options.hasOwnProperty("volume")) {
    state.volume = options.volume;
    state.pastVolume = options.volume;
  } else {
    state.volume = DEFAULT_VOLUME;
    state.pastVolume = DEFAULT_VOLUME;
  }

  if (options.hasOwnProperty("allowFullFrame")) {
    state.allowFullFrame = options.allowFullFrame;
  } else {
    state.allowFullFrame = DEFAULT_ALLOW_FULL_FRAME;
  }

  if (options.hasOwnProperty("currentTime")) {
    state.currentTime = options.currentTime;
  } else {
    state.currentTime = 0.0;
  }

  if (options.hasOwnProperty("logo")) {
    state.logo = options.logo;
  }

  if (options.hasOwnProperty("buttons")) {
    state.buttons = [];

    for (var i = 0; i < options.buttons.length; ++i) {
      if (!options.buttons[i].hasOwnProperty('img')) throw new Error("You need to specify the img property of each button");
      state.buttons.push(options.buttons[i]);
    }
  }

  if (options.hasOwnProperty("color")) {
    state.color = options.color;
  } else {
    state.color = DEFAULT_COLOR;
  }

  if (options.hasOwnProperty("thumbnail")) {
    state.thumbnail = options.thumbnail;
  }

  if (options.hasOwnProperty("muted")) {
    state.muted = options.muted;
  } else {
    state.muted = false;
  }

  if (options.hasOwnProperty("autoplay")) {
    state.autoplay = options.autoplay;
  } else {
    state.autoplay = false;
  }

  if (options.hasOwnProperty("style")) {
    state.style = options.style;
  } else {
    state.style = {};
  }

  if (options.hasOwnProperty("id")) {
    state.id = options.id;
  }

  if (options.hasOwnProperty("isTestEnvironment")) {
    state.isTestEnvironment = options.isTestEnvironment;
  }

  state.initTime = new Date();
  state.title = options.title;
  state.link = options.titleHref;
  state.isLoading = true;
  state.isPlayerHighlighted = false;
  state.isInitialized = false;
  state.isLargePlayButtonHighlighted = false;
  state.isPlaying = false;
  state.isReadingTerminated = false;
  state.showVolumeSlider = true;
  state.isFullscreen = false;
  state.isFullscreenActivated = false;
  state.highlightProgressBar = false;
  state.allowUnhighlightProgressBar = true;
  state.volumeSliderLeftMargin = "calculateMe!";
  state.allowMouseLeaveVolumeSlider = true;
  state.showMenus = false;
  state.allowMenuHiding = true;
  state.showCursor = true;
  state.timeLastUserAction = new Date();
  state.askTime = 0;
  state.askNextImage = null;
  state.askPreviousImage = null;
  state.videoHeight = null;
  state.videoWidth = null;
  state.timeRangeBuffered = 0;
  state.channelsWait = false;
  return state;
};

export { getInitState };