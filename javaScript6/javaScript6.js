let score = 0;           // מונה את מספר הלחיצות
let timeLeft = 10;        // זמן המשחק הכולל
let timer;               // משתנה לשמירת האינטרוול של הטיימר
let isGameOver = false;  // דגל לציון האם המשחק נגמר
let moveInterval;        // משתנה לשמירת האינטרוול של תזוזת הכפתור

// Update timer
function updateTimer() {
    timeLeft--;  // הפחתת שנייה מזמן המשחק
    document.getElementById('timer').textContent = `Time: ${timeLeft} seconds`;

    if (timeLeft === 0) {  // אם הזמן הגיע לאפס
        clearInterval(timer);        // עצירת הטיימר
        clearInterval(moveInterval); // עצירת תזוזת הכפתור
        document.getElementById('game-over').style.display = 'block';  // הצגת הודעת סוף משחק
        document.getElementById('restart-btn').style.display = 'inline-block';  // הצגת כפתור התחלה מחדש
        document.getElementById('reaction-btn').disabled = true;  // השבתת הכפתור
        isGameOver = true;  // סימון שהמשחק נגמר
    }
}

// Move button to random position
function moveButton() {
    // חישוב הגבולות המקסימליים למיקום אקראי
    const maxWidth = window.innerWidth - 250;   // רוחב המסך פחות רוחב הכפתור
    const maxHeight = window.innerHeight - 150; // גובה המסך פחות גובה הכפתור

    // יצירת קואורדינטות אקראיות
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    const btn = document.getElementById('reaction-btn');
    // קביעת המיקום החדש של הכפתור
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // הוספת אפקטים של סיבוב וגודל אקראי
    btn.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(${Math.random() * 0.2 + 0.9})`;
}

// Start game
function startGame() {
    // איפוס כל הפרמטרים
    timeLeft = 10;
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;

    // הסתרת הודעות סוף המשחק
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';

    const reactionBtn = document.getElementById('reaction-btn');
    reactionBtn.disabled = false;
    reactionBtn.style.transform = 'none';  // איפוס הטרנספורם
    isGameOver = false;

    // התחלת הטיימר - יורד שנייה בכל שנייה
    timer = setInterval(updateTimer, 1000);

    // התחלת תזוזת הכפתור - זז כל 200 מילישניות
    moveInterval = setInterval(moveButton, 600);

    // יצירת כפתור חדש למניעת מאזינים כפולים
    const newReactionBtn = reactionBtn.cloneNode(true);
    reactionBtn.parentNode.replaceChild(newReactionBtn, reactionBtn);

    // מאזין לחיצה על הכפתור
    newReactionBtn.addEventListener('click', () => {
        if (isGameOver) return;  // אם המשחק נגמר - לא לעשות כלום
        score++;  // הוספת נקודה
        document.getElementById('score').textContent = `Score: ${score}`;
        moveButton();  // הזזת הכפתור למיקום חדש
    });
}

// Restart button event
document.getElementById('restart-btn').addEventListener('click', () => {
    startGame();
});

// Start initial game
startGame();