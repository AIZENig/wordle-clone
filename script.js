if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// =====================
// DOM ELEMENTS
// =====================
const rows = document.querySelectorAll(".row");
const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// =====================
// CONSTANTS
// =====================
const WORD_LENGTH = 5;
const MAX_ROWS = 6;

// Answer pool
const ANSWERS = [
  "APPLE", "GRAPE", "BRICK", "PLANE", "CHAIR",
  "TABLE", "WATER", "MONEY", "HOUSE", "LIGHT",
  "SMILE", "HEART", "BREAD", "CANDY", "CLOCK",
  "EARTH", "FRUIT", "GREEN", "HAPPY", "JUICE",
  "KNIFE", "LAUGH", "MUSIC", "NURSE", "OCEAN",
  "PIZZA", "QUEEN", "RIVER", "SUGAR", "TIGER",
  "UNITY", "VALUE", "WHEEL", "YEAST", "ZEBRA",
  "ANGLE", "BEACH", "CLOUD", "DANCE", "EAGLE",
  "FIELD", "GIANT", "HORSE", "IMAGE", "JELLY",
  "KOALA", "LEMON", "MANGO", "NINJA", "OPERA"
];


// =====================
// GAME STATE
// =====================
let secretWord = "";
let currentRow = 0;
let gameOver = false;

// =====================
// INIT
// =====================
startGame();

submitBtn.addEventListener("click", submitGuess);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") submitGuess();
});
restartBtn.addEventListener("click", startGame);

// =====================
// GAME FLOW
// =====================
function startGame() {
    secretWord = randomAnswer();
    currentRow = 0;
    gameOver = false;

    message.textContent = "";
    input.value = "";
    input.disabled = false;
    submitBtn.disabled = false;

    clearGrid();

    console.log("Secret:", secretWord); // remove later
}

function submitGuess() {
    if (gameOver) return;

    const guess = input.value.trim().toUpperCase();

    if (guess.length !== WORD_LENGTH) {
        showMessage("Enter exactly 5 letters");
        return;
    }

    renderGuess(guess);

    if (guess === secretWord) {
        endGame(true);
        return;
    }

    currentRow++;

    if (currentRow === MAX_ROWS) {
        endGame(false);
    }

    input.value = "";
}

// =====================
// CORE WORDLE LOGIC
// =====================
function renderGuess(guess) {
    const cells = rows[currentRow].querySelectorAll(".cell");

    // Frequency map of secret word
    const letterCount = {};
    for (const char of secretWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // First pass — GREEN
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];
        cells[i].textContent = letter;

        if (letter === secretWord[i]) {
            cells[i].classList.add("correct");
            letterCount[letter]--;
        }
    }

    // Second pass — YELLOW or GRAY
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (cells[i].classList.contains("correct")) continue;

        const letter = guess[i];

        if (letterCount[letter] > 0) {
            cells[i].classList.add("present");
            letterCount[letter]--;
        } else {
            cells[i].classList.add("absent");
        }
    }
}

// =====================
// HELPERS
// =====================
function endGame(win) {
    gameOver = true;
    input.disabled = true;
    submitBtn.disabled = true;

    message.textContent = win
        ? "You win"
        : `You lose. Word was ${secretWord}`;
}

function clearGrid() {
    rows.forEach(row => {
        row.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
        });
    });
}

function randomAnswer() {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
}

function showMessage(text) {
    message.textContent = text;
}
