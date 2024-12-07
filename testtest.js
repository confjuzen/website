const words1 = ["Horse", "Pig", "Dog", "Cat", "Parrot", "Iguana"]
const words2 = ["Elephant", "Lion", "Tiger", "Monkey", "Chicken", "Bird"]
const words3 = ["Giraffe", "Fox", "Bear", "Wolf", "Rabbit", "Spider"]

let title = "Project Speed Type";
let html = document.getElementById("stapp");
let score = 0;
let count = 0;
let wordprompt = "Ready?";
let correct = "";
let wordList = words1;

function Game() {
    html.innerHTML = `
        <h2>${title}</h2>
            <label for="list">Choose Set:</label>
            <select id="cosenlist">
                <option value="list1">Set 1: ${words1}</option>
                <option value="list2">Set 2: ${words2}</option>
                <option value="list3">Set 3: ${words3}</option>
            </select>
        <p>Type the word: <strong>${wordprompt}</strong></p>
        <form id="gameForm">
            <input type="text" id="guess" autocomplete="off" autofocus/>
            <button id="btn" type="submit">Enter</button>
        </form>
        <p>${correct}</p>
        <p>Your score is ${score} out of ${count}.</p>

    `;

    setupEventListeners();
}






function setupEventListeners() {

    const dropdown = document.getElementById("cosenlist");
    dropdown.addEventListener("change", () => {
        const selectedoption = dropdown.value;
        if (selectedoption === "list1") {
            wordList = words1;
        } else if (selectedoption === "list2") {
            wordList = words2;
        } else if (selectedoption === "list3") {
            wordList = words3;
        }
        wordprompt = wordList[count];

        Game();
        
        
    });











    const form = document.getElementById("gameForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let guess = document.getElementById("guess").value.trim();
        if (guess === wordprompt) {
            score++;
            correct = "Correct!";
        } else {
            correct = "Incorrect :'(";
        }
        count++;
        if (count < words1.length) {
            wordprompt = words1[count];
        } else {
            wordprompt = "Game Over!";
        }
        Game();
    });
}

Game();