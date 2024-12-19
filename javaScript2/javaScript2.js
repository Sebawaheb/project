const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';  //משתנה שמסמן מי השחקן הנוכחי. מתחיל עם 'X'.
let board = Array(9).fill(null);  //מערך שמייצג את מצב הלוח. כל תא במערך תואם לתא בלוח. מתחיל כריק (עם ערכים של null).

const winningCombinations = [ //זהו מערך שמכיל את כל הקומבינציות האפשריות לניצחון
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//פונקציה זו מופעלת כאשר לוחצים על אחד התאים.
function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] || checkWinner()) return; // בודק אם התא כבר תפוס או אם יש מנצח
    //אם התא כבר תפוס (יש בו ערך), או שיש כבר מנצח (המשחק נגמר) – הפונקציה עוצרת (לא קורה כלום).

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        statusText.style.color = 'green';// צובע את ההודעה בירוק
        statusText.style.fontWeight = 'bold';

    } else if (board.every(cell => cell)) { // בודק אם כל התאים תפוסים
        statusText.textContent = `It's a draw!`;
        statusText.style.color = 'red';

    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        statusText.style.color = 'white';
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        if (combination.every(index => board[index] === currentPlayer)) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X'; //מחזיר את השחקן הראשון לתור.
    statusText.textContent = `Player X's turn`;
    statusText.style.color = 'white'; // מאתחל את הצבע
}

cells.forEach(cell => cell.addEventListener('click', handleClick)); //מחברים את כל התאים לפונקציית handleClick (כאשר לוחצים על תא, הפונקציה פועלת).
restartButton.addEventListener('click', restartGame); //מחברים את כפתור האתחול לפונקציית restartGame (כאשר לוחצים על הכפתור, המשחק מאתחל).

