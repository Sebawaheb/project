const images = [
    "./img/image1.png",
    "./img/image2.jpeg",
    "./img/image3.png",
    "./img/image4.avif",
    "./img/image5.jpg",
    "./img/image6.jpeg",
    "./img/image7.jpg",
    "./img/image8.avif",
    "./img/image9.jpeg",
    "./img/image10.jpeg",
    "./img/image11.avif",
    "./img/image12.avif",
    "./img/image13.webp",
    "./img/image14.jpeg",
    "./img/image15.png"

];
let selectedCards = []; //מערך שמכיל כרטיסים שהמשתמש בחר (עד 2 בכל זמן נתון).
let matchedPairs = 0; // מונה את מספר הזוגות התואמים שהמשתמש מצא.
let timer; // מזהה את טיימר הזמן המתחיל כאשר המשחק מתחיל.
let timeElapsed = 0; //משמש למעקב אחר משך הזמן שחלף מהתחלת המשחק.


function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const gameBoard = document.getElementById("game-board");
    const timerDisplay = document.getElementById("timer");
    const completionMessage = document.getElementById("completion-message");

    gameBoard.innerHTML = "";
    completionMessage.style.display = "none";
    matchedPairs = 0;
    timeElapsed = 0;
    clearInterval(timer);

    timerDisplay.textContent = "Time: 0s";
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 1000);

    let numPairs;
    let columns; // משתנה דינמי לעמודות
    if (difficulty === "easy") {
        numPairs = 5;
        columns = 5;
    } else if (difficulty === "medium") {
        numPairs = 10;
        columns = 5;
    } else {
        numPairs = 15;
        columns = 6;
    }

    // הגדרת מספר העמודות דינמית
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 120px)`;

    const cards = images.slice(0, numPairs).concat(images.slice(0, numPairs));
    shuffle(cards);

    cards.forEach((imageSrc) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.image = imageSrc;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

//יוצר אלמנט <div> לכל קלף, עם dataset.image שמכיל את כתובת התמונה.
// מוסיף אירוע onclick כדי לאפשר הפיכת קלף.


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        const img = document.createElement("img");
        img.src = card.dataset.image;
        card.appendChild(img);
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        selectedCards = [];
        if (matchedPairs === document.querySelectorAll(".card").length / 2) {
            clearInterval(timer);
            showCompletionMessage(); // קריאה לפונקציית הודעת סיום
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = ""; // הסרת התמונה
            card2.innerHTML = ""; // הסרת התמונה
            selectedCards = [];
        }, 1000);
    }
}

function showCompletionMessage() {
    const completionMessage = document.getElementById("completion-message");
    completionMessage.textContent = `Congratulations! You completed the game in ${timeElapsed} seconds. 😎`;
    completionMessage.style.display = "block";
}