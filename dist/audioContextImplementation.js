
let audioContext;
let unlocked = false;


const unlockAudio = () => {
    if (!unlocked) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // create a silent sound to unlock audio context
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);

      unlocked = true;
      console.log("🔓 AudioContext unlocked");
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

export {playBeep, unlockAudio}