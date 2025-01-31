"use strict";
Object.defineProperty(globalThis.exports = globalThis.exports || {}, "__esModule", { value: true });
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (message) => appendLog(`[INFO] ${message}`, "info"),
    error: (message) => appendLog(`[ERROR] ${message}`, "error")
};
function appendLog(message, type) {
    const logContainer = document.getElementById("log-container");
    if (logContainer) {
        const logEntry = document.createElement("div");
        logEntry.classList.add("log-entry");
        if (type === "error")
            logEntry.classList.add("log-error");
        else if (type === "info")
            logEntry.classList.add("log-info");
        else
            logEntry.classList.add("log-debug");
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight; // Auto-scroll
    }
}
class BackgroundAudio {
    constructor(soundUrl) {
        this.audio = new Audio();
        this.audio.src = soundUrl;
        this.audio.load();
        logger.info('[bg-audio] sound url loaded');
        console.log(`[bg-audio] sound url loaded`);
    }
    /**
     * function will play sound in customer background when peer joining
     */
    play() {
        if (this.audio.src) {
            this.audio.muted = false;
            this.audio.play();
            this.audio.loop = true;
            logger.info(`[bg-audio] play invoked | playing loaded audio from ${this.audio.src}`);
            console.log(`[bg-audio] play invoked | playing loaded audio from ${this.audio.src}`);
        }
        else {
            logger.error("[bg-audio] cannot play the audio | audio src does not exist");
            console.log("[bg-audio] cannot play the audio | audio src does not exist");
        }
    }
    dummyPlay() {
        if (this.audio.src) {
            this.audio.muted = true;
            this.audio.play();
            logger.info(`[bg-audio] dummy play invoked | playing loaded audio from ${this.audio.src}`);
            console.log(`[bg-audio] dummy play invoked | playing loaded audio from ${this.audio.src}`);
        }
        else {
            logger.error("[bg-audio] cannot play the audio | audio src does not exist");
            console.log("[bg-audio] cannot play the audio | audio src does not exist");
        }
    }
}
class AudioPlayer {
    constructor() {
        this.audioCollection = new Map();
    }
    static getInstance() {
        if (!AudioPlayer.instance) {
            AudioPlayer.instance = new AudioPlayer();
        }
        return AudioPlayer.instance;
    }
    load(Identifier, soundUrl) {
        const audio = new BackgroundAudio(soundUrl);
        this.audioCollection.set(Identifier, audio);
    }
    play(identifier, dummy = false) {
        const audio = this.audioCollection.get(identifier);
        if (audio) {
            if (dummy) {
                audio.dummyPlay();
            }
            else {
                audio.play();
            }
        }
        else {
            logger.error(`[bg-audio] no audio found with: ${identifier}`);
            console.log(`[bg-audio] no audio found with: ${identifier}`);
        }
    }
}
exports.AudioPlayer = AudioPlayer;
window.AudioPlayer = AudioPlayer;
