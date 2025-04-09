
let audioContext;
let unlocked = false;
let noiseSource;

const unlockAudio = () => {
    if (!unlocked) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
      gainNode.gain.value = 0.5; // Extra safety on volume

      noiseSource.connect(gainNode);
      gainNode.connect(audioContext.destination);
      noiseSource.start(0);
      console.log("🌫️ Low-volume noise loop started");
    }
  };


const stopSilentLoop = () => {
    if (silentSource) {
      silentSource.stop();
      silentSource.disconnect();
      silentSource = null;
      console.log("⏹️ Silent audio loop stopped");
    }
};

const playBeep = () => {
    if (!audioContext) {
      console.log("⚠️ AudioContext not initialized");
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4

    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 2); // Play for 1 second

    console.log("🔊 Beep sound played");
  };

export {playBeep, unlockAudio, stopSilentLoop}