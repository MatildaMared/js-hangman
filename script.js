// Array av ord som väljs slumpmässigt
const words = ["javascript", "function", "variable", "asynchronous", "programming", "iteration", "promises", "implementation", "execution", "hoisting", "closures", "queryselector", "argument", "callstack", "setinterval", "property", "conditionals", "constructor", "boolean", "operator", "precedence", "evaluation", "increment", "decrement"];

// Array över alfabetet
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let incorrectGuesses; // Antal felaktiga gissningar
let correctLetters; // Antal korrekta bokstäver
let word = ""; // Det slumpmässiga ordet
let buttons = ""; // Alfabetsknapparna

// Bokstäverna som visar det slumpmässiga ordet i DOM
let letters = "";
// Meddelanderuta
const messageElement = document.querySelector(".message");

// Väljer ett random ord ur en array och returnerar det
const randomWord = function (arr) {
    let randomNumber = Math.trunc(Math.random() * arr.length);
    return arr[randomNumber].toUpperCase();
}

// Undersöker om den gissade bokstaven finns med i ordet och uppdaterar HTML och ev. antal felaktiga gissningar
const compareLetters = function (letter, word) {
    // Skapar en variabel av bokstaven som ska jämföras
    let letterToCompare = letter.innerHTML;
    // Körs om bokstaven finns med i ordet
    if (word.includes(letterToCompare)) {
			letters.forEach((letter) => {
				if (letter.innerHTML === letterToCompare) {
					// Tar bort class "hidden"
					letter.classList.remove("hidden");
					// Adderar 1 till variabeln correctLetters
					correctLetters++;
				}
			});
		// Körs om bokstaven inte finns med i ordet
		} else {
        // Adderar 1 till variabeln incorrectGuesses
        incorrectGuesses++;
        // Visar en ny del av "gubben" på HTML-sidan genom att ta bort class "hidden"
        document.querySelector(`#del${incorrectGuesses}`).classList.remove("hidden");
    }
    buttons.forEach((button) => {
        if (button.innerHTML === letterToCompare) {
            // Lägger till klassen "guessed" på bokstaven som har klickats på
            button.classList.add("guessed");
        }
    });
}

// Function för att starta nytt spel
const newGame = function () {
	// Sätter felaktiga gissningar och korrekta bokstäver till 0
	incorrectGuesses = 0;
    correctLetters = 0;
    
	// Genererar ett slumpmässigt ord och lägger i en array
	word = randomWord(words).split("");

	// Skapar ordet i DOM och strecken under ordet
    word.forEach((character) => {
        // Skapar ett "aside"-element
        let aside = document.createElement("aside");
        // Ändrar innehållet i aside-elementet
		aside.innerHTML = `
        <h1 class="letter ${character} hidden">${character}</h1>
        `;
        // Lägger till klassen "letter-wrapper" på aside-elementet
        aside.classList.add("letter-wrapper");
        // Appendar elementet till HTML-elementet med klassen "word"
		document.querySelector(".word").appendChild(aside);
	});

	// Väljer alla bokstäver
	letters = document.querySelectorAll(".letter");
}

// Skapar en knapp för varje bokstav i alfabetet
alphabet.forEach((letter) => {
    // Skapar ett button element
    let button = document.createElement("button");
    // Sätter innehållet på knappen till en bokstav
    button.innerHTML = `${letter}`;
    // Appendar knappen till HTML-elementet med klassen "alphabet"
    document.querySelector(".alphabet").appendChild(button);
});

// Väljer alla knappar
buttons = document.querySelectorAll("button");

// För varje alfabetsknapp
buttons.forEach((letter) => {
    // Lägg till en event listener som lyssnar efter klick
    letter.addEventListener("click", () => {
        // Kör compareLetters-funktionen
        compareLetters(letter, word);
        // Om längden på det slumpmässiga talet är samma som variabeln correctLetters
        if (word.length === correctLetters) {
            // Kalla på funktionen announceWinner
            announceWinner();
        // Annars om antalet felaktiga gissningar är 10
        } else if (incorrectGuesses === 10) {
            // Kalla på funktionen defeat
            defeat();
        }
    });
});

// Funktion för att starta om spelet
const restartGame = function () {
    // Väljer alla element med klassen "letter-wrapper"
    let letterWrapper = document.querySelectorAll(".letter-wrapper");
    // För varje sådant element
    letterWrapper.forEach((letter) => {
        // Ta bort det från DOM
		letter.remove();
    });
    
    // Kalla på funktionen newGame
    newGame();
    
    // Väljer alla hangman-element
    let hangmanParts = document.querySelectorAll(".hangman");
    // För varje sådant element
    hangmanParts.forEach(part => {
        // Lägg till klassen "hidden"
        part.classList.add("hidden");
    });

    // Ta bort eventuellt meddelande i meddelanderutan
    if (messageElement.innerHTML != "") {
        messageElement.innerHTML = "";
    }

    // För alla bokstavsknappar
    buttons.forEach(button => {
        // Ta bort klassen "guessed"
        button.classList.remove("guessed");
    });
}

// Funktion för att visa att spelaren vunnit
const announceWinner = function () {
    // Skapar ett h2-element
    let message = document.createElement("h2");
    // Sätter innehållet i h2-elementet
    message.innerHTML = "Congratulations! You won! 🎉";
    // Appenda h2 till elementet med klassen "message"
    messageElement.appendChild(message);
    // Vänta 4 sekunder och kalla på funktionen restartGame
    setTimeout(restartGame, 4000);
}

// Funktion för att visa att spelaren förlorat
const defeat = function () {
    // Skapar ett h2-element
    let message = document.createElement("h2");
    // Sätter innehållet i h2-elementet
    message.innerHTML = "Sorry, you lost 😞";
    // Appenda h2 till elementet med klassen "message"
    messageElement.appendChild(message);
    // Vänta 4 sekunder och kalla på funktionen restartGame
    setTimeout(restartGame, 4000);
}

// Väljer restart-knappen
let restartButton = document.querySelector(".restart")

// Lyssna efter klick
restartButton.addEventListener("click", () => {
    // Om klick, kalla på funktionen restartGame
    restartGame();
});

// Kallar på funktionen newGame för att ett nytt spel ska startas när användaren går in på sidan
newGame();