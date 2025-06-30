function reset(){

  timingsinSeconds[currentModeIndex] = timings[currentModeIndex]*60;
  progressBarArray[currentModeIndex] = timings[currentModeIndex]*60;

  isRunning = true;

  document.querySelector(".start").textContent = "Start";

  document.querySelector("p").textContent = timings[currentModeIndex] < 10 ? "0" + timings[currentModeIndex] + ":00" : timings[currentModeIndex] + ":00";
  document.querySelector("title").textContent = states[currentModeIndex] + " - " + (timings[currentModeIndex] < 10 ? "0" + timings[currentModeIndex] + ":00" : timings[currentModeIndex] + ":00");

  document.querySelector("progress").max = progressBarArray[currentModeIndex];
  document.querySelector("progress").value = 0;

  clearInterval(intervalId);
}

function showCheckmark(mode){
  checkmarks[mode]++;
  const span = document.getElementById(`${mode}-check`);
  span.textContent = `✔ x ${checkmarks[mode]}`;
}


function nextShortBreak() {
  playAudio("break");
  switchToMode(1);
  timerCountDown();
}

function nextLongBreak() {
  playAudio("break");
  switchToMode(2);
  timerCountDown();
}

function nextPomodoro() {
  playAudio("backtowork");
  switchToMode(0);
  timerCountDown();
}

function switchToMode(index) {
  currentModeIndex = index;
  timingsinSeconds[currentModeIndex] = timings[index] * 60;

  document.querySelectorAll(".button-container button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".button-container button")[index].classList.add("active");

  document.body.classList.remove(...allColors);
  document.body.classList.add(allColors[index]);

  document.querySelector("progress").classList.remove(...darkerColors);
  document.querySelector("progress").classList.add(darkerColors[index]);

  document.querySelector(".start").textContent = "Stop";

  document.querySelector("p").textContent = timings[currentModeIndex] < 10 ? "0" + timings[currentModeIndex] + ":00" : timings[currentModeIndex] + ":00";
  document.querySelector("title").textContent = states[currentModeIndex] + " - " + (timings[currentModeIndex] < 10 ? "0" + timings[currentModeIndex] + ":00" : timings[currentModeIndex] + ":00");

  document.querySelector("progress").max = progressBarArray[currentModeIndex];
  document.querySelector("progress").value = 0;

  clearInterval(intervalId);
}

function timerCountDown() {
  if (isRunning) {
    document.querySelector(".start").textContent = "Stop";
    intervalId = setInterval(function () {
      timeDisplay();
      document.querySelector("progress").value = progressBarArray[currentModeIndex] - timingsinSeconds[currentModeIndex];

      timingsinSeconds[currentModeIndex]--;

      if (timingsinSeconds[currentModeIndex] < 0) {
        if (currentModeIndex === 0) {
          totalPomodoros++;
          showCheckmark("pomodoro");
        } else if (currentModeIndex === 1) {
          totalShortBreaks++;
          showCheckmark("short");
        } else if (currentModeIndex === 2) {
          totalLongBreaks++;
          showCheckmark("long");
        }

        clearInterval(intervalId);
        document.querySelector("p").textContent = "00:00";
        document.querySelector("progress").value = progressBarArray[currentModeIndex];

        isRunning = true;

        if (currentModeIndex === 0 && totalPomodoros % 4 !== 0 && totalPomodoros !== 0) {
          nextShortBreak();
        } else if (currentModeIndex === 0 && totalPomodoros % 4 === 0 && totalPomodoros !== 0){
          nextLongBreak();
        } else if (currentModeIndex === 1 || currentModeIndex === 2) {
          nextPomodoro();
        }

        return;
      }
    }, 1000);
    isRunning = false;
  } else {
    document.querySelector(".start").textContent = "Start";

    timeDisplay();

    clearInterval(intervalId);
    isRunning = true;
  }
}

function timeDisplay() {
  let seconds = timingsinSeconds[currentModeIndex] % 60;
  let minutes = Math.floor(timingsinSeconds[currentModeIndex] / 60);

  if (seconds === 0) {
    document.querySelector("p").textContent = minutes < 10 ? "0" + minutes + ":00" : minutes + ":00";
    document.querySelector("title").textContent = states[currentModeIndex] + " - " + (minutes < 10 ? "0" + minutes + ":00" : minutes + ":00");
  } else {
    if (seconds < 10) {
      document.querySelector("p").textContent = minutes < 10 ? "0" + minutes + ":0" + seconds : minutes + ":0" + seconds;
      document.querySelector("title").textContent = states[currentModeIndex] + " - " + (minutes < 10 ? "0" + minutes + ":0" + seconds: minutes + ":0" + seconds);
    } else {
      document.querySelector("p").textContent = minutes < 10 ? "0" + minutes + ":" + seconds : minutes + ":" + seconds;
      document.querySelector("title").textContent = states[currentModeIndex] + " - " + (minutes < 10 ? "0" + minutes + ":" + seconds : minutes + ":" + seconds);
    }
  }
}

function playAudio(sound) {
  var audio = new Audio(`./sounds/${sound}.mp3`);
  audio.play();
}

const allColors = ["sky-blue", "teal-green", "golden-yellow"];
const darkerColors = ["dark-blue", "dark-teal-green", "dark-golden-yellow"];
const timings = [25, 5, 15];
const timingsinSeconds = timings.map((t) => t * 60);
const progressBarArray = timings.map((t) => t * 60);
const states = ["Pomodoro", "Short Break", "Long Break"];
const checkmarks = {
  pomodoro: 0,
  short: 0,
  long: 0
};
let isRunning = true;
let intervalId = 0;
let currentModeIndex = 0;
let totalPomodoros = 0;
let totalShortBreaks = 0;
let totalLongBreaks = 0;

document.querySelectorAll(".button-container button").forEach((button, i) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      currentModeIndex = i;
      timingsinSeconds[currentModeIndex] = timings[i] * 60;

      document.querySelectorAll(".button-container button").forEach((btn) => {
        if (btn !== this) {
          btn.classList.remove("active");
        }
      });

      isRunning = true;

      document.body.classList.remove(...allColors);
      document.body.classList.add(allColors[i]);

      document.querySelector("progress").classList.remove(...darkerColors);
      document.querySelector("progress").classList.add(darkerColors[i]);

      document.querySelector(".start").textContent = "Start";

      document.querySelector("p").textContent = timings[i] < 10 ? "0" + timings[i] + ":00" : timings[i] + ":00";
      document.querySelector("title").textContent = states[i] + " - " + (timings[i] < 10 ? "0" + timings[i] + ":00" : timings[i] + ":00");

      document.querySelector("progress").max = progressBarArray[currentModeIndex];
      document.querySelector("progress").value = 0;

      clearInterval(intervalId);
    }
  });
});

document.querySelector(".start").addEventListener("click", function () {
  playAudio("button-sound");
  timerCountDown();
});

document.addEventListener("keydown", function(e){
  if(e.code === "Space" && !e.repeat){
    e.preventDefault();
    playAudio("button-sound");
    timerCountDown();

  }
});

document.querySelector(".reset").addEventListener("click", function(){
  playAudio("button-sound");
  reset();
});