import words from "./words.mjs";

// === GLOBALS ===
const alpha = "abcdefghijklmnopqrstuvwxyz";
const body = document.body;
let lives = 5;
let guessedLetters = [];
let imageIndex = 0;
let secretWord = words[Math.floor(Math.random() * words.length)];

// === ELEMENTS ===
const wordBox = document.querySelector(".wordBox");

const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("main");
body.appendChild(buttonsContainer);

const feedback = document.createElement("span");
feedback.classList.add("RoW");
body.appendChild(feedback);

const livesLabel = document.createElement("label");
livesLabel.textContent = "Lives ";
feedback.appendChild(livesLabel);

const livesCounter = document.createElement("span");
livesCounter.setAttribute("id", "LCounter");
livesCounter.innerText = lives;
feedback.appendChild(livesCounter);

const taunt = document.createElement("span");
feedback.appendChild(taunt);

const imageDisplay = document.createElement("span");
const hangmanImage = document.createElement("img");
hangmanImage.style.width = "100px";
hangmanImage.src = `resources/image0.png`;
imageDisplay.appendChild(hangmanImage);
body.appendChild(imageDisplay);

const playAgainButton = document.createElement("button");
playAgainButton.innerText = "Play Again";
playAgainButton.addEventListener("click", () => location.reload());

const helpButton = document.createElement("button");
helpButton.innerText = "Need Help ?";
helpButton.addEventListener("click", () => window.open("help.html"));

const footer = document.createElement("footer");
footer.classList.add("foot");
footer.append(playAgainButton, helpButton);
body.appendChild(footer);

// === FUNCTIONS ===
function createAlphabetButtons() {
  alpha.split("").forEach((char) => {
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.classList.add("btnAlpha");
    btn.addEventListener("click", () => handleGuess(btn));
    buttonsContainer.appendChild(btn);
  });
}

function setupWordDisplay() {
  for (let i = 0; i < secretWord.length; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.textContent = "___";
    letterDiv.classList.add("divOfLetters", secretWord[i]);
    letterDiv.style.display = "inline";
    wordBox.appendChild(letterDiv);
  }
}

function handleGuess(button) {
  const letter = button.textContent;
  button.disabled = true;

  if (lives <= 0) {
    endGame(false);
    return;
  }

  if (secretWord.includes(letter)) {
    button.style.backgroundColor = "#ff80ff";
    revealLetter(letter);
    guessedLetters.push(letter);
    checkWin();
  } else {
    lives--;
    livesCounter.innerText = lives;
    button.style.backgroundColor = "black";
    updateImage();
    showTaunt();
    if (lives <= 0) endGame(false);
  }
}

function revealLetter(letter) {
  const elements = document.querySelectorAll(`.${letter}`);
  elements.forEach((el) => (el.textContent = letter));
}

function checkWin() {
  const uniqueLetters = new Set(secretWord);
  const hasWon = [...uniqueLetters].every((ch) => guessedLetters.includes(ch));
  if (hasWon) endGame(true);
}

function endGame(won) {
  feedback.innerText = won ? "You Saved him" : "Game over. You killed a man";
  buttonsContainer.style.transition = "opacity 2s ease-in";
  buttonsContainer.style.opacity = "0";
  setTimeout(() => {
    buttonsContainer.style.display = "none";
  }, 4000);
}

function updateImage() {
  imageIndex++;
  hangmanImage.src = `resources/image${imageIndex}.png`;
}

function showTaunt() {
  taunt.innerText = '"Wrong; please choose carefully. Someone\'s life depends on it."';
  taunt.style.transition = "opacity 2s ease-in-out";
  setTimeout(() => (taunt.style.opacity = 0), 1000);
  setTimeout(() => {
    taunt.innerText = "";
    taunt.style.opacity = 1;
  }, 3000);
}

// === INIT ===
console.log("Secret Word:", secretWord);
createAlphabetButtons();
setupWordDisplay();
