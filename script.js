const body = document.body;

let Alphabets = "abcdefghijklmnopqrstuvwxyz";

let ButtonsDiv = document.createElement("div");

ButtonsDiv.classList.add("main");

body.appendChild(ButtonsDiv);

let buttons = [];

let wordBox = document.querySelector(".wordBox");

var lives = 5;

function disableButton(button) {
	button.disabled = true;
}

for (let i = 0; i < Alphabets.length; i++) {
	buttons.push(document.createElement("button"));

	buttons[i].textContent = Alphabets.charAt(i);
	buttons[i].classList.add("buttonsAlphabet");
	ButtonsDiv.append(buttons[i]);

	buttons[i].addEventListener("click", () => {
		if (lives == 0) {
			RightOrWrong.innerText = `game over you killed a man  `;

			ButtonsDiv.style.transition = "opacity 2s ease-in";

			ButtonsDiv.style.opacity = "0";

			//	ButtonsDiv.style.visibility = "hidden";

			setTimeout(() => {
				console.log("hi this after timeout");

				ButtonsDiv.style.display = "none";
			}, 4000);
		}

		if (secretWord.includes(buttons[i].innerText)) {
			buttons[i].style.backgroundColor = "#ff80ff";

			let chosenLetterIndex = secretWord.indexOf(buttons[i].innerText);

			//console.log("letter index " + chosenLetterIndex);

			let chosenLetterDiv = document.querySelectorAll(
				`.${secretWord.charAt(chosenLetterIndex)}`
			);

			chosenLetterDiv.forEach((e) => {
				e.innerText = buttons[i].innerText;
			});
			isWon(buttons[i]);
			disableButton(buttons[i]);
		} else {
			updateLCounter();
			changeGraphics();
			buttons[i].style.backgroundColor = "black";

			--lives;

			console.log(lives);

			console.log("wrong letter selected ");

			//disableButton(buttons[i]);
			Taunt.innerText =
				'"wrong ; please choose carefully someone\'s live depends on it ."';
			Taunt.style.transition = "opacity 2s ease-in-out";

			setTimeout(() => {
				Taunt.style.opacity = 0;
			}, 1000);

			setTimeout(() => {
				Taunt.innerText = "";
				Taunt.style.opacity = 1;
			}, 3000);
		}
	});
}

const words = [
	"hello",
	"hell",
	"angel",
	"demon",
	"messiah",
	"penance",
	"faith",
	"grace",
	"love",
	"forgiveness",
	"redemption",
	"salvation",
	"heaven",
	"Jesus",
	"resurrection",
	"prophet",
	"commandments",
	"blessings",
	"miracles",
	"covenant",
	"righteousness",
	"atonement",
	"disciples",
	"prophecy",
	"kingdom",
	"eternity",
	"prayer",
	"holiness",
	"mercy",
	"repentance",
	"temptation",
	"sacrifice",
	"victory",
	"gratitude",
	"worship",
	"hope",
	"joy",
	"peace",
	"compassion",
	"gratitude",
	"patience",
	"humility",
	"faithfulness",
	"perseverance",
	"obedience",
	"gospel",
	"advent",
	"creation",
	"shepherd",
	"light",
	"faith",
	"deliverance",
	"glory",
	"providence",
];
let graphics = document.createElement("span");
let image = document.createElement("img");
image.style.width = "100px";

graphics.appendChild(image);

body.appendChild(graphics);
let secretWord = words[Math.floor(Math.random() * words.length)];

console.log(secretWord);

for (let i = 0; i < secretWord.length; i++) {
	let LetterDiv = document.createElement("div");
	LetterDiv.style.display = "inline";

	LetterDiv.classList.add(`${secretWord.charAt(i)}`);

	LetterDiv.classList.add("divOfLetters");

	LetterDiv.textContent = "___";
	wordBox.appendChild(LetterDiv);
}

let playAgain = document.createElement("button");
playAgain.innerText = "Play Again";

let Hint = document.createElement("button");
Hint.innerText = "Need Help ?";

let RightOrWrong = document.createElement("span");
RightOrWrong.classList.add("RoW");

let footer = document.createElement("footer");

footer.append(playAgain, Hint);

footer.classList.add("foot");
body.append(RightOrWrong);
body.appendChild(footer);

//add function to play again

playAgain.addEventListener("click", NewGame);

function NewGame() {
	location.reload();
}

//add function to needHelp button

Hint.addEventListener("click", help);

function help() {
	window.open("help.html");
}

var LivesCounter = document.createElement("span");

LivesCounter.setAttribute("id", "LCounter");

LivesCounter.innerText = lives + 1;
function updateLCounter() {
	LivesCounter.innerText = lives;
}
let Label = document.createElement("label");

Label.innerText = "Lives";

RightOrWrong.appendChild(Label);

RightOrWrong.appendChild(LivesCounter);

var Taunt = document.createElement("span");
RightOrWrong.appendChild(Taunt);

var ltrList = [];
function isWon(BtnText) {
	ltrList.push(BtnText.innerText);
	ltrList.includes(...secretWord);
	console.log(ltrList);
	let CList = [...secretWord];
	console.log(CList);
	let won = CList.every((e) => ltrList.includes(e));
	console.log(won);

	if (won) {
		RightOrWrong.innerText = "You Saved him ";

		ButtonsDiv.style.transition = "opacity 2s ease-in";

		ButtonsDiv.style.opacity = "0";

		setTimeout(() => {
			console.log("hi this after timeout");

			ButtonsDiv.style.display = "none";
		}, 4000);
	}
}

let Hangman = [];

for (let i = 0; i <= 6; i++) {
	Hangman.push(`resources/image${i}.png`);
}
console.log(Hangman);
image.src = Hangman[0];
var imgNum = 0;
function changeGraphics() {
	let i = imgNum;
	imgNum++;
	image.src = Hangman[i];
}
