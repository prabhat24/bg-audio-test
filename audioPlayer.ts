Object.defineProperty(globalThis.exports = globalThis.exports || {}, "__esModule", { value: true });

const logger = {
  info: (message: string) => appendLog(`[INFO] ${message}`, "info"),
  error: (message: string) => appendLog(`[ERROR] ${message}`, "error")
};

declare let globalThis: any;

declare let window: any;

function appendLog(message: string, type: string) {
  const logContainer = document.getElementById("log-container");
  if (logContainer) {
      const logEntry = document.createElement("div");
      logEntry.classList.add("log-entry");
      if (type === "error") logEntry.classList.add("log-error");
      else if (type === "info") logEntry.classList.add("log-info");
      else logEntry.classList.add("log-debug");
      logEntry.textContent = message;
      logContainer.appendChild(logEntry);
      logContainer.scrollTop = logContainer.scrollHeight; // Auto-scroll
  }
}

class BackgroundAudio {
//   private soundUrl: string = '';
  private audio: HTMLAudioElement;

  constructor(soundUrl: string) {
    this.audio = new Audio()
    this.audio.src = soundUrl;
    this.audio.load();
    logger.info('[bg-audio] sound url loaded');
    console.log(`[bg-audio] sound url loaded`)
  }

  /**
   * function will play sound in customer background when peer joining
   */
  public play(): void {
    if (this.audio.src) {
      this.audio.muted = false
      this.audio.play();
      this.audio.loop = true;
      logger.info(`[bg-audio] play invoked | playing loaded audio from ${this.audio.src}`);
      console.log(`[bg-audio] play invoked | playing loaded audio from ${this.audio.src}`)
    }
    else {
      logger.error("[bg-audio] cannot play the audio | audio src does not exist")
      console.log("[bg-audio] cannot play the audio | audio src does not exist")
    }
  }

  public dummyPlay(): void {
    if (this.audio.src) {
      this.audio.muted = true
      this.audio.play();
      logger.info(`[bg-audio] dummy play invoked | playing loaded audio from ${this.audio.src}`);
      console.log(`[bg-audio] dummy play invoked | playing loaded audio from ${this.audio.src}`)
    }
    else {
      logger.error("[bg-audio] cannot play the audio | audio src does not exist")
      console.log("[bg-audio] cannot play the audio | audio src does not exist")
    }
  }
}

export class AudioPlayer {
  private static instance: AudioPlayer;
  private audioCollection: Map<string, BackgroundAudio>;


  constructor() {
    this.audioCollection = new Map<string, BackgroundAudio>()
  }

  public static getInstance(): AudioPlayer {
      if (!AudioPlayer.instance) {
        AudioPlayer.instance = new AudioPlayer();
      }
      return AudioPlayer.instance;
  }

  public load(Identifier: string, soundUrl: string) {
    const audio = new BackgroundAudio(soundUrl)
    this.audioCollection.set(Identifier, audio)
  }

  public play(identifier: string, dummy=false) {
    const audio = this.audioCollection.get(identifier)
    if (audio) {
      if (dummy) {
        audio.dummyPlay()
      }
      else {
        audio.play()
      }
    }
    else {
      logger.error(`[bg-audio] no audio found with: ${identifier}`)
      console.log(`[bg-audio] no audio found with: ${identifier}`)
    }
  }
}
window.AudioPlayer = AudioPlayer;