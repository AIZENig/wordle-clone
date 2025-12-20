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
  "APPLE","GRAPE","BRICK","PLANE","CHAIR","TABLE","WATER","MONEY",
  "HOUSE","LIGHT","SMILE","HEART","BREAD","CANDY","CLOCK","EARTH",
  "FRUIT","GREEN","HAPPY","JUICE","KNIFE","LAUGH","MUSIC","NURSE",
  "OCEAN","PIZZA","QUEEN","RIVER","SUGAR","TIGER","UNITY","VALUE",
  "WHEEL","YEAST","ZEBRA"
];

// =====================
// GAME STATE
// =====================
let secretWord = "";
let currentRow = 0;
let gameOver = false;
let hintGiven = false;

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
  hintGiven = false;

  input.value = "";
  input.disabled = false;
  submitBtn.disabled = false;
  message.textContent = "";

  clearGrid();
  console.log("SECRET:", secretWord); // remove later
}

function submitGuess() {
  if (gameOver || currentRow >= MAX_ROWS) return;

  const guess = input.value.trim().toUpperCase();

  // Only rule: exactly 5 letters
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

  // Hint when 2 rows left
  if (currentRow === MAX_ROWS - 2 && !hintGiven) {
    giveHint();
  }

  if (currentRow === MAX_ROWS) {
    endGame(false);
  }

  input.value = "";
}

// =====================
// WORDLE LOGIC
// =====================
function renderGuess(guess) {
  const cells = rows[currentRow].querySelectorAll(".cell");

  const letterCount = {};
  for (const ch of secretWord) {
    letterCount[ch] = (letterCount[ch] || 0) + 1;
  }

  // Pass 1 — GREEN
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i];
    cells[i].textContent = letter;

    if (letter === secretWord[i]) {
      cells[i].classList.add("correct");
      letterCount[letter]--;
    }
  }

  // Pass 2 — YELLOW / GRAY
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
// HINT SYSTEM
// =====================
function giveHint() {
  hintGiven = true;

  const revealed = new Set();

  for (let r = 0; r < currentRow; r++) {
    rows[r].querySelectorAll(".cell").forEach((cell, i) => {
      if (cell.classList.contains("correct")) {
        revealed.add(i);
      }
    });
  }

  const options = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (!revealed.has(i)) options.push(i);
  }

  if (options.length === 0) return;

  const index = options[Math.floor(Math.random() * options.length)];
  message.textContent = `Hint: Letter ${index + 1} is "${secretWord[index]}"`;
}

// =====================
// HELPERS
// =====================
function endGame(win) {
  gameOver = true;
  input.disabled = true;
  submitBtn.disabled = true;

  message.textContent = win
    ? "You win!"
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
