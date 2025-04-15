import {AudioPlayer} from "./audioPlayer.js"


let audioContext;
let unlocked = false;
let noiseSource;
let dest;

function logMessage(message, type="info") {
  const logContainer = document.getElementById("log-container");
  const logEntry = document.createElement("div");
  logEntry.classList.add("log-entry");

  if (type === "error") logEntry.classList.add("log-error");
  else if (type === "info") logEntry.classList.add("log-info");
  else logEntry.classList.add("log-debug");

  logEntry.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;
}


const whiteNoiseAudio = () => {
    if (!unlocked) {
      const audioPlayer = AudioPlayer.getInstance()
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      dest = audioContext.createMediaStreamDestination();
      // create a silent sound to unlock audio context
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, sampleRate, sampleRate); // 1-second buffer
      const data = buffer.getChannelData(0);

      // Fill buffer with very soft white noise
      for (let i = 0; i < sampleRate; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.001; // Noise between -0.001 and 0.001
      }

      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1; // Extra safety on volume

      noiseSource.connect(gainNode);
      gainNode.connect(dest);
      noiseSource.start(0);
      logMessage("🌫️ Low-volume noise loop started");
      return dest
    }
  };


async function playAudioFromFile(url, loop) {
  if (!audioContext || !dest) {
    logMessage("Audio context not initialized yet.", "error");
    return;
  }

  try {
    
    const audioElement = new Audio();
    audioElement.src = url
    audioElement.crossOrigin = "anonymous";
    audioElement.load()
    const source = audioContext.createMediaElementSource(audioElement);
    // Create source and gain
    // const source = audioContext.createBufferSource();
    // source.buffer = audioBuffer;
    if (loop) {
      source.loop = true;
    }
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1.0; // Adjust volume as needed

    // Connect to same destination as white noise
    source.connect(gainNode);
    gainNode.connect(dest);

    source.start();
    logMessage("Mixing 2 audio. Beep sound mixed");

    // Optional: return the source to stop it manually later
    return source;
  } 
  catch (err) {
    logMessage("Failed to load or play audio:", "error");
  }
}

const stopSilentLoop = () => {
    if (silentSource) {
      silentSource.stop();
      silentSource.disconnect();
      silentSource = null;
      console.log("⏹️ Silent audio loop stopped");
    }
};

const returnBeep = () => {
    if (!audioContext) {
      console.log("⚠️ AudioContext not initialized");
      return;
    }
    const dest = audioContext.createMediaStreamDestination();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume

    oscillator.connect(gainNode);
    gainNode.connect(dest);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 2); // Play for 2 second
    return dest

  };

export {returnBeep, whiteNoiseAudio, stopSilentLoop, playAudioFromFile}