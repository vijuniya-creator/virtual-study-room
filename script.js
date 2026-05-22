// ======================
// TIMER
// ======================

let timer;
let totalSeconds = 25 * 60;
let isRunning = false;


// ELEMENTS

const timerDisplay =
document.querySelector(".timer");

const startBtn =
document.getElementById("startBtn");

const pauseBtn =
document.getElementById("pauseBtn");

const resetBtn =
document.getElementById("resetBtn");

const setTimerBtn =
document.getElementById("setTimerBtn");

const hoursInput =
document.getElementById("hoursInput");

const minutesInput =
document.getElementById("minutesInput");


// ======================
// UPDATE TIMER
// ======================

function updateTimer(){

    let hrs =
    Math.floor(totalSeconds / 3600);

    let mins =
    Math.floor((totalSeconds % 3600) / 60);

    let secs =
    totalSeconds % 60;

    timerDisplay.innerText =
    `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

updateTimer();


// ======================
// START
// ======================

startBtn.addEventListener("click", () => {

    if(isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        if(totalSeconds <= 0){

            clearInterval(timer);

            isRunning = false;

            // SHOW POPUP

            document.querySelector(".break-popup")
            .classList.add("show");

            // PLAY SOUND

            document.getElementById("alarmSound")
            .play();

            return;
        }

        totalSeconds--;

        updateTimer();

    },1000);

});


// ======================
// PAUSE
// ======================

pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;
});


// ======================
// RESET
// ======================

resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;

    totalSeconds = 25 * 60;

    updateTimer();
});


// ======================
// CUSTOM TIMER
// ======================

setTimerBtn.addEventListener("click", () => {

    let hrs =
    parseInt(hoursInput.value) || 0;

    let mins =
    parseInt(minutesInput.value) || 0;

    totalSeconds =
    (hrs * 3600) + (mins * 60);

    updateTimer();
});


// ======================
// LIVE CLOCK
// ======================

function updateClock(){

    const now = new Date();

    let hrs =
    now.getHours();

    let mins =
    String(now.getMinutes())
    .padStart(2,'0');

    let ampm =
    hrs >= 12 ? "PM" : "AM";

    hrs = hrs % 12;

    hrs = hrs ? hrs : 12;

    document.querySelector(".live-clock")
    .innerText =
    `${hrs}:${mins} ${ampm}`;
}

updateClock();

setInterval(updateClock,1000);


// ======================
// TASKS
// ======================

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.querySelector(".task-list");


// ADD TASK

addTaskBtn.addEventListener("click", () => {

    let taskText =
    taskInput.value.trim();

    if(taskText === "") return;

    let taskCard =
    document.createElement("div");

    taskCard.classList.add("task-card");

    taskCard.innerHTML = `

        <span class="task-text">
            ${taskText}
        </span>

        <div class="task-actions">

            <button class="complete-btn">
                ✓
            </button>

            <button class="delete-btn">
                ✕
            </button>

        </div>
    `;


    // COMPLETE

    taskCard
    .querySelector(".complete-btn")
    .addEventListener("click", () => {

        taskCard.classList.toggle("completed");
    });


    // DELETE

    taskCard
    .querySelector(".delete-btn")
    .addEventListener("click", () => {

        taskCard.remove();
    });


    taskList.appendChild(taskCard);

    taskInput.value = "";
});


// ======================
// CLOSE POPUP
// ======================

document
.getElementById("closePopup")
.addEventListener("click", () => {

    document
    .querySelector(".break-popup")
    .classList.remove("show");
});