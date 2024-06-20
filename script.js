// script.js
let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00.00';
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('p');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}