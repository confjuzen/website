const words1 = ["Horse", "Pig", "Dog", "Cat", "Parrot", "Iguana"];
const words2 = ["Elephant", "Lion", "Tiger", "Monkey", "Chicken", "Bird"];
const words3 = ["Giraffe", "Fox", "Bear", "Wolf", "Rabbit", "Spider"];

let title = "Project Speed Type";
let html = document.getElementById("stapp");
let score = 0;
let count = 0;
let wordList = words1;
let wordprompt = "Ready?";
let correct = "";
let time = 0
let timerInterval;
let leaderboard = []

let p1 = true;
let p2 = false;
let p3 = false;

// Initialize the game UI
html.innerHTML += `
    <div class="box">
    <h2>${title}</h2>
    <div id="gameContent">
        <div id="timer"></div>
        <div id="dropdownContainer"></div>
        <div id="promptContainer"></div>
        <div id="formContainer"></div>
        <div id="resultContainer"></div>
    </div>
    </div>
    <div id="leaderboard" class="box">
    <h3>Leaderboard</h3>
    <ul id="leaderboardList">${leaderboard}</ul>
    </div>
`;

function chosesetfunction() {
    if (p1) {
        const dropdownContainer = document.getElementById("dropdownContainer");
        dropdownContainer.innerHTML = `        
            <label for="cosenlist">Choose Set:</label>
            <select name="cosenlist" id="cosenlist">
                <option value="list1">Set 1:</option>
                <option value="list2">Set 2:</option>
                <option value="list3">Set 3:</option>
            </select>
        `;
        const dropdown = document.getElementById("cosenlist");
        dropdown.addEventListener("change", () => {
            const selectedValue = dropdown.value;
            if (selectedValue === "list1") {
                wordList = words1;
            } else if (selectedValue === "list2") {
                wordList = words2;
            } else if (selectedValue === "list3") {
                wordList = words3;
            }
            wordprompt = wordList[count];
        });
    }
}

function startfunction() {
    if (p1 === true) {
        const promptContainer = document.getElementById("promptContainer");
        promptContainer.innerHTML = `
        <br>
        <button type="button" id="startButton">Start</button>`;
        document.getElementById("startButton").addEventListener("click", () => {
            p1 = false;
            p2 = true;
            wordprompt = wordList[count];
            wordpromptfuction();
            textinputfunction();
            hidefunction();
            timerfunction();
        });
    }
}

function timerfunction() {
    if (p2) {
        time = 0;
        const timerElement = document.getElementById("timer");
        timerElement.innerHTML = `Time: ${time}s`;

        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            time++;
            timerElement.innerHTML = `Time: ${time}s`;
        }, 1000);

        }
    }



function wordpromptfuction() {
    if (p2 === true) {
        const promptContainer = document.getElementById("promptContainer");
        promptContainer.innerHTML = `
        <p>Type the word: <strong>${wordprompt}</strong></p>`;
    }
}

function textinputfunction() {
    if (p2 === true) {
        const formContainer = document.getElementById("formContainer");
        formContainer.innerHTML = `
            <form id="gameForm">
                <input type="text" id="guess" autocomplete="off" autofocus />
                <button id="btn" type="submit">Enter</button>
            </form>`;
        const inputField = document.getElementById("guess");
            inputField.focus();
        const form = document.getElementById("gameForm");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const guess = document.getElementById("guess").value.trim().toLowerCase();
            const targetword = wordprompt.toLowerCase();
            if (guess === targetword) {
                score++;
                correct = "Correct!";
            } else {
                correct = "Incorrect :'(";
            }
            count++;
            if (count < wordList.length) {
                wordprompt = wordList[count];
            } else {
                wordprompt = "Game Over!";
                p2 = false;
                p3 = true;
            }
            textinputfunction();
            correctfunction();
            scorefunction();
            if (p2) wordpromptfuction();
            if (p3) endGame();
                    hidefunction();
        });
    }
}

function correctfunction() {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<p>${correct}</p>`;
}

function scorefunction() {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML += `
        <p>Your score is ${score} out of ${count}.</p>`;
}

function endGame() {
    clearInterval(timerInterval);
    const promptContainer = document.getElementById("promptContainer");
    const formContainer = document.getElementById("formContainer");
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `${time} seconds`;
    promptContainer.innerHTML = `<p>Game Over! Final Score: ${score} out of ${wordList.length}.</p>`;
    const finaltime = parseInt(timerElement.innerHTML.split(" ")[1]);
    formContainer.innerHTML = `
    <input type="text" id="playername" placeholder="Enter Your Name" />
    <button type="button" id="submitscore">Submit</button>`;
    document.getElementById("submitscore").addEventListener("click", () => {
        const playername = document.getElementById("playername").value.trim();
        if (playername) {
            leaderboard.push({ playername, score: finaltime })}});
    formContainer.innerHTML += `
        <button id="restartButton">Restart</button>`;
    document.getElementById("restartButton").addEventListener("click", () => {
        // Reset game state
        score = 0;
        count = 0;
        wordList = words1;
        wordprompt = "Ready?";
        correct = "";
        p1 = true;
        p2 = false;
        p3 = false;
        startGame();
        hidefunction();
        leaderboardfunction(playername, score, finaltime);
    });
}
    

function startGame() {
    chosesetfunction();
    startfunction();
}

function hidefunction() {

    const dropdownContainer = document.getElementById("dropdownContainer");
    const resultContainer = document.getElementById("resultContainer");
    const promptContainer = document.getElementById("formContainer");
    const timerElement = document.getElementById("timer");
    if (p1) {
        formContainer.innerHTML = "";
        timerElement.innerHTML = "";
    }
    if (p2) {
        dropdownContainer.innerHTML = "";
    }
    if (p3) {
        resultContainer.innerHTML = "";
    }
}

function leaderboardfunction(playername, score, time) {
    leaderboard.push({ playername, score, time });
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
    leaderboard.slice(0, 10);
    const leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = leaderboard
    .map(entry => `<li>${entry.name}: ${entry.score} points - ${entry.time}s</li>`)
    .join("");
}

startGame();
