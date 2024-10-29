let words = ["computer", "cat", "airplane", "slowmotion", "mountain", "phone", "television"];
let lives = 7;
let chosenWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = "_".repeat(chosenWord.length).split(""); 

function displayWord() {
    document.getElementById("word-container").innerHTML = hiddenWord.join(" ");
}

function isValidLetter(guessedLetter) {
    return /^[a-z]$/.test(guessedLetter);
}

function updateHiddenWord(guessedLetter) {
    let found = false;
    for (let i = 0; i < chosenWord.length; ++i) {
        if (chosenWord[i] === guessedLetter) {
            hiddenWord[i] = guessedLetter;
            found = true;
        }
    }
    return found;
}

function displayFeedback (found) {
    if (found) {
        document.getElementById("result").innerHTML =
        '<span class="text-success">Congratulations, you found a letter!</span>';
    } else {
        --lives;
        document.getElementById("result").innerHTML = 
        '<span class="text-danger">The letter was not found :(</span>';
    }
}

function checkGameStatus() {
    if (!hiddenWord.includes('_')) {
        if (lives > 0) {
            document.getElementById('status-message').innerHTML =
            '<span class="text-success">Yay, you won the game!</span>';
            document.getElementById('letter-input').disabled = true;
            return true;
        } else {
            document.getElementById('status-message').innerHTML =
            '<span class="text-danger">Unfortunately, you have 0 lives, so you lost :)</span';
            document.getElementById('letter-input').disabled = true;
            return true;
        }
    }
    return false;
}

function guessLetter() {
    let guessedLetter = document.getElementById("letter-input").value.toLowerCase();
     
    if (!isValidLetter(guessedLetter)) {
        document.getElementById('result').innerHTML =
        '<span class="text-danger">Please introduce a letter!</span>';
        document.getElementById("letter-input").value = "";
        return;
    }

    const found = updateHiddenWord(guessedLetter);
    displayWord();
    displayFeedback(found);

    if(checkGameStatus()) {
        return;
    }
    
    document.getElementById("letter-input").value = "";
}

displayWord();
