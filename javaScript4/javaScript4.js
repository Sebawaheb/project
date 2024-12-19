document.addEventListener("DOMContentLoaded", function () {
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    const sumInput = document.getElementById("sum");
    const message = document.getElementById("message");
    const checkButton = document.getElementById("check");
    const nextButton = document.getElementById("next");
    const op = document.getElementById("op");

    // Generate random numbers and operator
    function generateNumbers() {
        const randomNum1 = Math.floor(Math.random() * 10) + 1;
        const randomNum2 = Math.floor(Math.random() * 10) + 1;
        const operations = ["+", "-", "*", "/"];
        const randomOp = operations[Math.floor(Math.random() * operations.length)];

        num1.textContent = randomNum1;
        num2.textContent = randomNum2;
        op.textContent = randomOp;
        sumInput.value = "";
        message.textContent = "";
    }

    // Check the user's answer
    function checkAnswer() {
        const number1 = parseInt(num1.textContent);
        const number2 = parseInt(num2.textContent);
        const userAnswer = parseFloat(sumInput.value);
        const operation = op.textContent;
        let correctAnswer;

        // Calculate the correct answer based on the operator
        switch (operation) {
            case "+":
                correctAnswer = number1 + number2;
                break;
            case "-":
                correctAnswer = number1 - number2;
                break;
            case "*":
                correctAnswer = number1 * number2;
                break;
            case "/":
                correctAnswer = parseFloat((number1 / number2).toFixed(2)); // Rounded to 2 decimal places
                break;
        }

        // Check the user's answer
        if (userAnswer === correctAnswer) {
            message.textContent = "Good job! The answer is correct 😊";
            message.style.color = "green";
        } else {
            message.textContent = `Wrong answer! The correct answer is ${correctAnswer} 😢`;
            message.style.color = "red";
        }
    }

    // Event listeners for buttons
    checkButton.addEventListener("click", checkAnswer);
    nextButton.addEventListener("click", generateNumbers);

    // Initialize the first question
    generateNumbers();
});



