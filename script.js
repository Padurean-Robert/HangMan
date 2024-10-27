let words = ["computer", "cat", "airplane", "slowmotion", "mountain", "phone", "television"];
let lives = 7;


let chosenWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = "_".repeat(chosenWord.length).split(""); 

function displayWord() {
    document.getElementById("word-container").innerHTML = hiddenWord.join(" ");
}

displayWord();

function guessLetter() {
    let guessedLetter = document.getElementById("letter-input").value.toLowerCase();
    let feedbackMessage = "";

    if (!/^[a-z]$/.test(guessedLetter)) {
        document.getElementById("result").innerHTML = 
        `<span class="text-danger">Te rog să introduci o literă validă (a-z).</span>`;
        document.getElementById("letter-input").value = "";
        return;
    }

    let found = false;

    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === guessedLetter) {
            hiddenWord[i] = guessedLetter; 
            found = true;
        }
    }

    if (found) {
        document.getElementById("result").innerHTML = `<span class="text-success">Bravo, ai găsit o literă corectă!</span>`;
    } else {
        --lives;
        document.getElementById("result").innerHTML = `<span class="text-danger">Litera nu se află în cuvânt.</span>`;
    }

    displayWord();

    if (!hiddenWord.includes('_')) {
        if (lives > 1) {
        document.getElementById('status-message').innerHTML = 
        `<span class="text-success">Felicitări! Ai ghicit cuvântul și ai câștigat jocul!</span>`;
        document.getElementById('letter-input').disabled = true;
        return;
        } else if (lives <= 0) {
            document.getElementById('status-message').innerHTML = 
            `<span class="text-danger">Din păcate, ai rămas fără vieți și ai pierdut jocul!</span>`;
            document.getElementById('letter-input').disabled = true;
            return;
        }
    }
    document.getElementById("letter-input").value = "";
}