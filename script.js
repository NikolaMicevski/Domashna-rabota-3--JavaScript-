const words = ["albania", "austria", "belgium", "bulgaria", "croatia", "denmark", "finland", "france", "germany", "greece", "hungary", "ireland", "italy", "macedonia", "netherlands", "norway", "poland", "portugal", "spain", "sweden"];
let selectedWord = "";
let displayedWord = [];
let attempts = 0;
const maxAttempts = 5;

function startNewGame() {
    selectedWord = getRandomWord();
    displayedWord = getInitialDisplay(selectedWord);
    attempts = 0;

    updateDisplay();

    document.getElementById("result-popup").style.display = "none";
    document.getElementById("new-game-button").style.display = "none";
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function getInitialDisplay(word) {
    return word.slice(0, 3).split('').concat(Array(word.length - 3).fill('_'));
}

function updateDisplay() {
    document.getElementById("word-display").textContent = displayedWord.join(" ");
    document.getElementById("attempts-count").textContent = maxAttempts - attempts;
}

function makeGuess() {
    const guessInput = document.getElementById("guess-input").value.toLowerCase();

    if (guessInput === selectedWord.toLowerCase()) {
        showResultPopup(true);
        return;
    }

    if (guessInput.length === 1 && guessInput.match(/[a-z]/)) {
        handleLetterGuess(guessInput);
    } else {
        if (attempts < maxAttempts - 1) {
            attempts++;
        } else {
            showResultPopup(false);
            return;
        }
    }

    updateDisplay();
}


function handleLetterGuess(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }

        if (!displayedWord.includes("_")) {
            showResultPopup(true);
        }
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            showResultPopup(false);
        }
    }

    updateDisplay();
}

function showResultPopup(isSuccess) {
    const resultPopup = document.getElementById("result-popup");
    const resultMessage = document.getElementById("result-message");

    if (isSuccess) {
        resultMessage.textContent = "Congratulations! You guessed the word!";
    } else {
        resultMessage.textContent = `Game over.`;
    }

    resultPopup.style.display = "block";
    document.getElementById("new-game-button").style.display = "block";
}


startNewGame();
