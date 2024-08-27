let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");

let turnO = true; // true for player O, false for player X

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

function checkWinner() {
    const values = Array.from(boxes).map(box => box.innerText);

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (values[a] && values[a] === values[b] && values[a] === values[c]) {
            return values[a]; // Return the winner ("X" or "O")
        }
    }
    return null; // No winner
}

function handleClick(event) {
    const box = event.target;
    if (box.innerText) return; // Ignore if the box is already taken

    if (turnO) {
        box.innerText = "X";
    } else {
        box.innerText = "O";
    }
    turnO = !turnO; // Switch turns

    const winner = checkWinner();
    if (winner) {
        alert(`Player ${winner} wins!`);
        boxes.forEach(box => box.removeEventListener("click", handleClick));
    }
}

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.addEventListener("click", handleClick);
    });
    turnO = true; // Reset to player O's turn
}

boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});

resetbtn.addEventListener("click", resetGame);
