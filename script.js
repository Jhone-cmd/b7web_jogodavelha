// Initials Data
let board = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: "",
}

let turn = "";
let warning = "";
let playing = false;

reset();

// Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", itemClick);
});

// Functions

function itemClick(event) {

    let item = event.target.getAttribute("data-item");
    if(playing && board[item] === "") {
        board[item] = turn;
        renderBoard();
        toggePlayer();
    }
}

function reset() {

    warning = ""

    let randomm = Math.floor(Math.random() * 2);

    turn = (randomm === 0) ? "X" : "O";

    for(let i in board) {
        board[i] = "";
    }

    playing = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for(let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = board[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector(".vez").innerHTML = turn;
    document.querySelector(".resultado").innerHTML = warning;
}

function toggePlayer() {
    turn === "X" ? turn = "O" : turn = "X";
    renderInfo();
}

function checkGame() {

    if(checkWinnerFor("X")) {
        warning = 'O "x" Venceu';
        playing = false;
    } else if (checkWinnerFor("O")) {
        warning = 'O "o" Venceu';
        playing = false;
    } else if(isFull()) {
        warning = "Deu Empate";
        playing = false;
    }
}

function checkWinnerFor(player) {
    
    let possibilites = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ]

    for(let winner in possibilites) {
        let possibilitesArray = possibilites[winner].split(",");
        let hasWon = possibilitesArray.every(option => board[option] === player);
        if(hasWon) {
            return true;
        }
    }   

    return false;
}


function isFull() {
    for(let i in board) {
        if(board[i] === "") {
            return false;
        }
    }

    return true;
}