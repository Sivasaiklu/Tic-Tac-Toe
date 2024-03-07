let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
let newBtn = document.querySelector("#new-btn")
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn0 = true;
let count = 0;


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O";
            box.style.color = "greenyellow";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    })
})


const gameDraw = () => {
    msg.innerText = `Game Draw`;
    msg.style.color = "DarkRed";
    msgConatiner.classList.remove("hide");
    disableBoxes();
};


const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgConatiner.classList.add("hide");

}


const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg.style.color = "DarkRed";
    msgConatiner.classList.remove("hide");
    disableBoxes();
};


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}


const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
}


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);