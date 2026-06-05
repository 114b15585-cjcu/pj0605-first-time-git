let timer = null;
let remainingSeconds = 0;
let isPaused = false;

const input = document.getElementById("secondsInput");
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(remainingSeconds);
}

function startTimer() {
    timer = setInterval(() => {

        if (remainingSeconds <= 0) {
            clearInterval(timer);
            display.textContent = "時間到！";
            return;
        }

        remainingSeconds--;
        updateDisplay();

    }, 1000);
}

startBtn.addEventListener("click", () => {

    clearInterval(timer);

    const value = parseInt(input.value);

    if (isNaN(value) || value <= 0) {
        alert("請輸入有效秒數");
        return;
    }

    remainingSeconds = value;
    isPaused = false;

    updateDisplay();
    startTimer();
});

pauseBtn.addEventListener("click", () => {

    if (!timer) return;

    clearInterval(timer);
    timer = null;
    isPaused = true;
});

resumeBtn.addEventListener("click", () => {

    if (!isPaused || remainingSeconds <= 0) return;

    isPaused = false;
    startTimer();
});

resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    timer = null;
    isPaused = false;
    remainingSeconds = 0;

    input.value = "";
    display.textContent = "00:00:00";
});