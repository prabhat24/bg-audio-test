import {
    AudioPlayer
} from "./audioPlayer.js";

import {
    returnBeep, whiteNoiseAudio, playAudioFromFile
} from "./audioContextImplementation.js"

try {
    var audioPlayer = AudioPlayer.getInstance();
}
catch (error){
    console.log(error)
}
var timeoutId = null
var playSoundTimer = 5;
var playAudioContext;
var delayDropdown;
var audioEle;
// document.addEventListener("DOMContentLoaded", function () {

//     logMessage("Document is fully loaded!", "info");
//     addVisibilityChangeHandler()


//     audioPlayer.load("join-sound", "https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3");

//     const playButton = document.getElementById("play-button");
//     const infoMessageEle = document.getElementById("info-message");
//     const counter = document.getElementById("counter");
//     const playAudioContext = document.getElementById("play-audio-context");
//     playButton.onclick = () => {
//         playAudioContext.style.display = 'none'
//         playButton.style.display = "none";
//         infoMessageEle.style.display = "block";
//         infoMessageEle.innerText = `We will play audio on this device after ${playSoundTimer} sec. Please minimize the tab.`;
//         logMessage(`Audio will play in ${playSoundTimer} sec...`, "info");

//         let i = playSoundTimer;
//         playSoundHandler(true);
//         function handler() {
//             counter.style.display = "block";
//             counter.innerText = `Playing audio in ${i} sec...`;
//             logMessage(`Countdown: ${i} sec remaining`, "info");
//             i--;
//             if (i === -1) {
//                 playSoundHandler();
//                 counter.innerText = `Audio play invoked !!!`;
//             }
//             if (i >= 0) {
//                 setTimeout(handler, 1000);
//             }
//         }
//         setTimeout(handler, 1000);
//     };
// });

// sound play using audio context
document.addEventListener("DOMContentLoaded", function () {


    playAudioContext = document.getElementById("play-audio-context");
    const infoMessageEle = document.getElementById("info-message");
    const counter = document.getElementById("counter");
    const playButton = document.getElementById("play-button");
    const stopButton = document.getElementById("stop-playing")
    delayDropdown = document.getElementById("delay-dropdown");
    audioEle = document.getElementById("audio-ele")
    addAudioHandlers(audioEle)
    delayDropdown.addEventListener("change", onChangeDelayDropdown)

    playAudioContext.onclick = () => {
        clearTimeout(timeoutId)
        playAudioContext.style.display = "none"
        playButton.style.display = "none";
        infoMessageEle.style.display = "block";
        infoMessageEle.innerText = `We will play audio on this device after ${playSoundTimer} sec. Please minimize the tab.`;
        logMessage(`Audio will play in ${playSoundTimer} sec...`, "info");

        let i = playSoundTimer;
        const whiteNoiseStream = whiteNoiseAudio()
    
        audioEle.srcObject = whiteNoiseStream.stream
        audioEle.play();
        function handler() {
            clearTimeout(timeoutId)
            counter.style.display = "block";
            counter.innerText = `Playing audio in ${i} sec...`;
            logMessage(`Countdown: ${i} sec remaining`, "info");
            i--;

            if (i === -1) {
                // audioEle.pause()
                // audioEle.srcObject = null
                console.log(navigator.mediaSession)
                if ('mediaSession' in navigator) {
                    logMessage("create new media session");
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: 'VKYC Join Call Sound',
                        artist: 'VKYC App',
                        album: 'Audio Playback Test',
                        artwork: [
                            { src: 'https://images.yourstory.com/cs/images/companies/SocialMediaLogoWHITE-1692612725795.jpg', sizes: '512x512', type: 'image/jpg' } // optional
                        ]
                    });
            
                    navigator.mediaSession.playbackState = 'playing';
                }
                // audioEle.src = "https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3"
                // audioEle.load();
                // audioEle.loop = true;
                // audioEle.play()
                playAudioFromFile("https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3", true)
                counter.innerText = `Audio play invoked !!!`;
                console.log(navigator.mediaSession)
                logMessage("Audio play invoked !!!", "info")
            }
            if (i >= 0) {
                timeoutId = setTimeout(handler, 1000);
            }
        }
        timeoutId = setTimeout(handler, 1000);
    };


});


function addAudioHandlers(element){

    element.onplay = () => {
        logMessage("audio element| audio play")
    }
    element.onplaying = () => {
        logMessage("audio element| on playing ele")
    }
    element.onpause = () => {
        logMessage("on pause ele")
    }
    element.onsuspend = () => {
        logMessage("audio element| on suspend ele")
    }
    element.onended = () => {
        logMessage("audio element| play back has ended")
    }
    element.onerror = () => {
        logMessage("audio element| audio ele error")
    }
    element.onwaiting = () => {
        logMessage("audio element| audio ele waiting")
    }
    element.onabort = () => {
        logMessage("audio element| audio ele aborted")
    }
}


function onChangeDelayDropdown(event) {
    const selectedVal = this.value
    playSoundTimer = parseInt(selectedVal)
    console.log(selectedVal)
    playAudioContext.style.display = "block"
    playAudioContext.innerText = `Play sound after ${selectedVal} sec`

}

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


function playSoundHandler(dummy=false) {
    try {
        audioPlayer.play("join-sound", dummy);
        logMessage("Audio is now playing!", "info");
    } catch (error) {
        logMessage("Error playing audio: " + error.message, "error");
    }
}

function playAudioContextHandler(dummy=false) {
    try {
        // audioContextPlayer.play("join-sound", dummy);
        playBeep()
        logMessage("Audio context is now playing!", "info");
    } catch (error) {
        logMessage("Error playing audio context: " + error.message, "error");
    }
}

function addVisibilityChangeHandler() {
    document.onvisibilitychange = () => {
        logMessage(`Visibility State is ${document.visibilityState}`);
    }
}

document.getElementById("copy-logs-btn").addEventListener("click", function () {
    const logContainer = document.getElementById("log-container");
    const logs = logContainer.innerText.trim();
    const copyBtn = this;

    if (!logs) {
        copyBtn.textContent = "⚠️ No logs!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
        return;
    }

    navigator.clipboard.writeText(logs).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
    }).catch(err => {
        console.error("Copy failed:", err);
        copyBtn.textContent = "❌ Failed";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
    });
});

window.onload = function () {
    const userAgent = navigator.userAgent;
    const userAgentTextElem = document.getElementById("user-agent-text");
    const copyButton = document.getElementById("copy-user-agent");

    userAgentTextElem.textContent = userAgent;

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(userAgent)
            .then(() => {
                copyButton.textContent = "✅";
                setTimeout(() => {
                    copyButton.textContent = "📋";
                }, 1500);
            })
            .catch(err => {
                console.error("Failed to copy user agent: ", err);
            });
    });
};