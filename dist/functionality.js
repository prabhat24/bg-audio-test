import {
    AudioPlayer
} from "./audioPlayer.js";

try {
    var audioPlayer = AudioPlayer.getInstance();
}
catch (error){
    console.log(error)
}

document.addEventListener("DOMContentLoaded", function () {

    logMessage("Document is fully loaded!", "info");
    addVisibilityChangeHandler()


    audioPlayer.load("join-sound", "https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3");
    
    let playSoundTimer = 5;
    const playButton = document.getElementById("play-button");
    const infoMessageEle = document.getElementById("info-message");
    const counter = document.getElementById("counter");

    playButton.onclick = () => {
        playButton.style.display = "none";
        infoMessageEle.style.display = "block";
        infoMessageEle.innerText = `We will play audio on this device after ${playSoundTimer} sec. Please minimize the tab.`;
        logMessage(`Audio will play in ${playSoundTimer} sec...`, "info");

        let i = playSoundTimer;
        playSoundHandler(true);
        function handler() {
            counter.style.display = "block";
            counter.innerText = `Playing audio in ${i} sec...`;
            logMessage(`Countdown: ${i} sec remaining`, "info");
            i--;

            if (i === 0) {
                playSoundHandler();
            }
            if (i >= 0) {
                setTimeout(handler, 1000);
            }
        }
        setTimeout(handler, 1000);
    };


});

function logMessage(message, type) {
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

function addVisibilityChangeHandler() {
    document.onvisibilitychange = () => {
        logMessage(`Visibility State is ${document.visibilityState}`);
    }
}