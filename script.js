let turn = "X"; // Initial turn
const turnInfo = document.querySelector(".turninfo");
const boxes = document.querySelectorAll(".boxtext");
const resetButton = document.getElementById("reset");
let danceGif = document.querySelector(".imagecontainer img");

const write = new Audio("write.mp3")
const win = new Audio("win.wav")
let start =new Audio("preview.mp3")
let draw =new Audio("draw.wav")

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to check for a winner
const checkWin = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerHTML !== "" && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            turnInfo.innerHTML = `🎉 ${boxes[a].innerHTML} Wins!......`;
            highlightWinningBoxes(pattern);
            danceGif.style.display='block'
            win.play();
            return true;
        }
    }
    return false;
};

// Function to highlight winning boxes
const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].parentElement.classList.add("winning-box");
    });
};

// Function to check for a draw
const checkDraw = () => {
    let allFilled = [...boxes].every(box => box.innerHTML !== "");
    if (allFilled) {
        turnInfo.innerHTML = `It's a Draw! Click Reset`;
        draw.play()
        return true;
    }
    return false;
};

// Function to switch turns
const changeTurn = () => {
    turn = turn === "X" ? "O" : "X";
    turnInfo.innerHTML = `Turn for ${turn}`;
};

// Function to reset the game
const resetGame = () => {
    start.play()
    boxes.forEach(box => {
        box.innerHTML = "";
        box.parentElement.classList.remove("winning-box");
    });
    turn = "X"; // Reset turn to X
    turnInfo.innerHTML = `Turn for ${turn}`; // Update turn info
    danceGif.style.display="none";
};

// Add event listeners to each box
document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", function (e) {
        let textbox = e.target.querySelector(".boxtext");

        // If box is empty and there's no winner, fill it with the current turn's symbol
        if (textbox && textbox.innerHTML === "" && !checkWin()) { 
            textbox.innerHTML = turn; 
            write.play();
            if (checkWin() || checkDraw()) return; // Stop further moves if game is over
            changeTurn(); // Switch turn after move
        }
        
    });
});

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);