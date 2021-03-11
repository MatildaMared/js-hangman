// De ord som går att slumpa i spelet
const words = ["javascript", "function", "variable"];

// Array över alfabetet
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Antal felaktiga gissningar
let incorrectGuesses;

// Antal korrekta bokstäver
let correctLetters;

// Det slumpmässiga ordet
let word = "";

// Alfabetsknapparna
let buttons = "";

// Bokstäverna som visar det slumpmässiga ordet i DOM
let letters = "";

// Meddelanderuta
const messageElement = document.querySelector(".message");

// Funktion som väljer ett random ord ur array
const randomWord = function (arr) {
    let randomNumber = Math.trunc(Math.random() * arr.length);
    return arr[randomNumber].toUpperCase();
}

// Funktion som undersöker om den gissade bokstaven finns med i ordet och uppdaterar HTML och antal liv
const compareLetters = function (letter, word) {
    // Skapar en variabel av bokstaven som ska jämföras
    let letterToCompare = letter.innerHTML;
    // Körs om bokstaven finns med i ordet
    if (word.includes(letterToCompare)) {
            letters.forEach((letter) => {
                if (letter.innerHTML === letterToCompare) {
                    letter.classList.remove("hidden");
                    correctLetters++;
                    console.log(`Du har ${correctLetters} bokstäver korrekt`);
                }
            });
    } else {
        // Körs om bokstaven inte finns med i ordet
        incorrectGuesses++;
        document.querySelector(`#del${incorrectGuesses}`).classList.remove("hidden");
    }
    // Lägger till klassen "guessed" på bokstaven som har klickats på
    buttons.forEach((button) => {
        if (button.innerHTML === letterToCompare) {
            button.classList.add("guessed");
        }
    });
}


// Function för att starta nytt spel
const newGame = function () {
	// Sätter felaktiga gissningar och korrekta bokstäver till 0
	incorrectGuesses = 0;
	correctLetters = 0;
	// Skapar en array av ett slumpmässigt ord
	word = randomWord(words).split("");
	console.log(word);

	// Skapar ordet i DOM och strecken under ordet
	word.forEach((character) => {
		let aside = document.createElement("aside");
		aside.innerHTML = `
        <h1 class="letter ${character} hidden">${character}</h1>
        `;
		aside.classList.add("letter-wrapper");
		document.querySelector(".word").appendChild(aside);
	});

	// Väljer alla bokstäver
	letters = document.querySelectorAll(".letter");
}

// Skapar en knapp för varje bokstav i alfabetet
alphabet.forEach((letter) => {
    let button = document.createElement("button");
    button.innerHTML = `${letter}`;
    document.querySelector(".alphabet").appendChild(button);
});

// Väljer alla knappar
buttons = document.querySelectorAll("button");

// Lägg till en event listener för varje knapp
buttons.forEach((letter) => {
    letter.addEventListener("click", () => {
        console.log(letter);
        compareLetters(letter, word);
        if (word.length === correctLetters) {
            announceWinner();
        } else if (incorrectGuesses === 10) {
            defeat();
        }
    });
});

const restartGame = function () {
	let letterWrapper = document.querySelectorAll(".letter-wrapper");
	letterWrapper.forEach((letter) => {
		letter.remove();
	});

	// Sätter felaktiga gissningar och korrekta bokstäver till 0
	incorrectGuesses = 0;
	correctLetters = 0;
	// Skapar en array av ett slumpmässigt ord
	word = randomWord(words).split("");
	console.log(word);

	// Skapar ordet i DOM och strecken under ordet
	word.forEach((character) => {
		let aside = document.createElement("aside");
		aside.innerHTML = `
        <h1 class="letter ${character} hidden">${character}</h1>
        `;
		aside.classList.add("letter-wrapper");
		document.querySelector(".word").appendChild(aside);
	});

	// Väljer alla bokstäver
    letters = document.querySelectorAll(".letter");
    
    // Välja alla hangman-element
    let hangmanParts = document.querySelectorAll(".hangman");
    hangmanParts.forEach(part => {
        part.classList.add("hidden");
    });

    // Ta bort eventuellt meddelande i meddelanderutan
    if (messageElement.innerHTML != "") {
        messageElement.innerHTML = "";
    }

    // Ta bort klassen guessed från alla bokstavsknappar
    buttons.forEach(button => {
        button.classList.remove("guessed");
    });
}

// Function som körs om man vinner
const announceWinner = function () {
    let message = document.createElement("h2");
    message.innerHTML = "Congratulations! You won! 🎉";
    messageElement.appendChild(message);
    setTimeout(restartGame, 4000);
}

// Function som körs om man förlorar
const defeat = function () {
    let message = document.createElement("h2");
    message.innerHTML = "Sorry, you lost 😞";
    messageElement.appendChild(message);
    setTimeout(restartGame, 4000);
}

let restartButton = document.querySelector(".restart")
restartButton.addEventListener("click", () => {
    restartGame();
});

newGame();