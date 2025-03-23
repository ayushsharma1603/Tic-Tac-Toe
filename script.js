let turn = "X";
const changeTurn = () => {
    let currentTurn = turn;
    turn = (turn === "X") ? "O" : "X";
    return currentTurn;
}

// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(function(box) {
    box.addEventListener('click', function(e) {
        let textbox = e.target.querySelector('.boxtext'); // Correct way to get the span inside

        if (textbox && textbox.innerHTML === "") { // Prevent overwriting
            textbox.innerHTML = changeTurn(); 
        }
        document.querySelector(".turninfo").innerHTML=`Turn for ${turn}`

    }); 
});



let button = document.querySelector("button");
button.addEventListener('click',(e)=>{
    turn="X"
    let turninfo=document.querySelector(".turninfo")
    turninfo.innerHTML=`Turn for ${turn}`

    Array.from(document.querySelectorAll(".boxtext")).forEach( (boxtext)=>{
        boxtext.innerHTML="";
    } )
});

