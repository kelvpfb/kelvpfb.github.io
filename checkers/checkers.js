const board = 
[
    null,   0,      null,   1,      null,   2,      null,   3, 
    4,      null,   5,      null,   6,      null,   7,      null, 
    null,   8,      null,   9,      null,   10,     null,   11, 
    12,     null,   13,     null,   14,     null,   15,     null, 
    null,   16,     null,   17,     null,   18,     null,   19, 
    20,     null,   21,     null,   22,     null,   23,     null, 
    null,   24,     null,   25,     null,   26,     null,   27, 
    28,     null,   29,     null,   30,   null,     31,     null, 
]

let redsPieces = document.getElementsByClassName("pieceRed"); //all RED pieces
let blacksPieces = document.getElementsByClassName("pieceBlack"); // all BLACK pieces
const cells = document.querySelectorAll(".tileGrey, .tileWhite"); //all cells white or grey
const redTurn = document.querySelectorAll(".redTurn"); // RED text "Your turn!"
const blackTurn = document.querySelectorAll(".blackTurn"); // BLACK text "Your turn!"

let turn = true; //true == RED turn ### false == BLACK turn
//used to track captured pieces
var redScore = 0;
var blackScore = 0;
var redID;
var blackID;

let findPiece = function(pieceID) { //finds a piece's index in board[] from its pieceID
    let parsed = parseInt(pieceID);
    return board.indexOf(parsed)
}

let selectedPiece = { //tracks possible moves for the clicked piece
    pieceID: -1, //id for the piece
    isKing: false, //is it a king?
    boardIndex: -1,
    seventhSpace: false,
    minusSeventhSpace: false,
    ninthSpace: false,
    minusNinthSpace: false,
    fourteenthSpace: false,
    minusFourteenthSpace: false,
    eighteenthSpace: false,
    minusEighteenthSpace: false,
}

function givePiecesClicks(){ //gives all pieces a click event to trigger getPlayerPieces
    if (turn) { //if it is RED turn
        //$(".pieceRed").click(getSelectedPiece);
        for(var i = 0; i < redsPieces.length; i++){
            redsPieces[i].addEventListener("click", getSelectedPiece);
        }
    } else { //if it is BLACK turn
       // $(".pieceBlack").click(getSelectedPiece);
       for(var i = 0; i < blacksPieces.length; i++){
        blacksPieces[i].addEventListener("click", getSelectedPiece);
        }
    }
    console.log( "turn is : " + turn);
}

function getSelectedPiece() {
    removeCellonclick();
    removeTint();
    resetSelectedPieceProperties();
    selectedPiece.pieceID = $(this).attr('id'); //pieceID is the id of the clicked piece
    selectedPiece.isKing = $(this).hasClass("king"); //tracks if piece is a king
    selectedPiece.boardIndex = findPiece(selectedPiece.pieceID); //gets a piece's index in board[]
    getAvailableSpaces();
}
    //indented functions are all children on getSelectedPiece();
    function removeCellonclick() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("onclick");
        }
    }

    function removeTint() {
        if(turn){
            for (let i = 0; i < redsPieces.length; i++)
            redsPieces[i].style.opacity = "100%";
        } else {
            for (let i = 0; i < blacksPieces.length; i++)
            blacksPieces[i].style.opacity = "100%";
        }
    }

    function resetSelectedPieceProperties() { //resets properties of the clicked piece
        selectedPiece.pieceID = -1;
        selectedPiece.isKing = false;
        boardIndex = -1;
        selectedPiece.seventhSpace = false; 
        selectedPiece.minusSeventhSpace = false;
        selectedPiece.ninthSpace = false;
        selectedPiece.minusNinthSpace = false;
        selectedPiece.fourteenthSpace = false;
        selectedPiece.minusFourteenthSpace = false;
        selectedPiece.eighteenthSpace = false;
        selectedPiece.minusEighteenthSpace = false;
    }

function getAvailableSpaces() {  //gets normal (non-jump) available spaces
    if ( !($("#" + board[selectedPiece.boardIndex + 7]).hasClass("pieceRed"))
    && !($("#" + board[selectedPiece.boardIndex + 7]).hasClass("pieceBlack"))
    /*&& ((board[selectedPiece.BoardIndex] + 7) <= 31 )*/) {
            selectedPiece.seventhSpace = true; //RED right backward, BLACK left forward
    }
    if ( !($("#" + board[selectedPiece.boardIndex + 9]).hasClass("pieceRed"))
    && !($("#" + board[selectedPiece.boardIndex + 9]).hasClass("pieceBlack"))
    /*&& ((board[selectedPiece.BoardIndex] + 9) <= 31 )*/) {
            selectedPiece.ninthSpace = true; //RED right forward, BLACK left backward
    }
    if ( !($("#" + board[selectedPiece.boardIndex - 7 ]).hasClass("pieceRed"))
    && !($("#" + board[selectedPiece.boardIndex - 7]).hasClass("pieceBlack"))
    /*&& (selectedPiece.BoardIndex - 7) >= 0*/ ) {
            selectedPiece.minusSeventhSpace = true; //RED left forward, BLACK right backward
    }
    if ( !($("#" + board[selectedPiece.boardIndex - 9]).hasClass("pieceRed"))
    && !($("#" + board[selectedPiece.boardIndex - 9]).hasClass("pieceBlack")) 
    /*&& (selectedPiece.BoardIndex - 9) >= 0*/ ) {
            selectedPiece.minusNinthSpace = true; //RED left backward, BLACK right forward
    }
    checkAvailableJumpSpaces(); //will check jumpable spaces
}

function checkAvailableJumpSpaces() {
    if ( !($("#" + board[selectedPiece.boardIndex + 18]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex + 18]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex + 9]).hasClass("pieceBlack")) {
        selectedPiece.eighteenthSpace = true; //RED skip right forward
    }
    if ( !($("#" + board[selectedPiece.boardIndex -14 ]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex -14 ]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex - 7]).hasClass("pieceBlack")) {
        selectedPiece.minusFourteenthSpace = true; //RED skip left forward
    }
    if ( !($("#" + board[selectedPiece.boardIndex +14 ]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex +14 ]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex + 7]).hasClass("pieceBlack")) {
        selectedPiece.minusFourteenthSpace = true; //RED skip right backward
    }
    if ( !($("#" + board[selectedPiece.boardIndex -18 ]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex -18 ]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex -9]).hasClass("pieceBlack")) {
        selectedPiece.minusFourteenthSpace = true; //RED skip left backward
    }
    if ( !($("#" + board[selectedPiece.boardIndex + 14]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex + 14]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex + 7]).hasClass("pieceRed")) {
        selectedPiece.fourteenthSpace = true; //BLACK skip left forward
    }
    if ( !($("#" + board[selectedPiece.boardIndex - 18]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex - 18]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex - 9]).hasClass("pieceRed")) {
        selectedPiece.minusEighteenthSpace = true; //BLACK skip right forward
    }
    if ( !($("#" + board[selectedPiece.boardIndex - 14]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex - 14]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex - 7]).hasClass("pieceRed")) {
        selectedPiece.fourteenthSpace = true; //BLACK skip right backward
    }
    if ( !($("#" + board[selectedPiece.boardIndex + 18]).hasClass("pieceRed")) 
    && !($("#" + board[selectedPiece.boardIndex + 18]).hasClass("pieceBlack"))
    && $("#" + board[selectedPiece.boardIndex + 9]).hasClass("pieceRed")) {
        selectedPiece.minusEighteenthSpace = true; //BLACK skip left backward
    }
    checkPieceConditions();
}

function checkPieceConditions() { //check if the piece is a king to change allowed moves
    if (selectedPiece.isKing) {
        givePieceTint();
    } else { //if not king
        if (turn) { //block backwards moves for RED
            selectedPiece.seventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else { //block backwards moves for BLACK
            selectedPiece.ninthSpace = false;
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.eighteenthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
        }
        givePieceTint();
    }
}

function givePieceTint() { // tints piece if selected and valid moves are available
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eigteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceID).style.opacity = "50%";
        giveCellsClick();
        
    } else {
         return;
    }
}

function giveCellsClick() { //gives tiles the onclick attribute if that tile is a valid move
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.boardIndex + 7].setAttribute("onclick", "makeMove(7)");
    }
    if(selectedPiece.ninthSpace) {
        cells[selectedPiece.boardIndex + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.boardIndex + 14].setAttribute("onclick", "makeMove(14)");
    }
    if(selectedPiece.eighteenthSpace) {
        cells[selectedPiece.boardIndex + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.boardIndex - 7].setAttribute("onclick", "makeMove(-7)");  
    }
    if(selectedPiece.minusNinthSpace) {
        cells[selectedPiece.boardIndex - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.boardIndex - 14].setAttribute("onclick", "makeMove(-14)") ; 
    }
    if(selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.boardIndex - 18].setAttribute("onclick", "makeMove(-18)");  
    }
}

function makeMove(number) {
    if (number == 14)
    {
        capture(7);
    }
    if (number == -14)
    {
        capture(-7);
    }
    if (number == 18)
    {
        capture(9);
    }
    if (number == -18)
    {
        capture(-9);
    }
    if (turn) { //RED turn
        $(document.getElementById(selectedPiece.pieceID)).removeClass("pieceRed");
        if (selectedPiece.isKing) {
            $("#" + board[selectedPiece.boardIndex + number]).addClass("pieceRed");
            $("#" + board[selectedPiece.boardIndex + number]).addClass("king");
            redsPieces = document.getElementsByClassName("pieceRed");
        } else {
            $("#" + board[selectedPiece.boardIndex + number]).addClass("pieceRed");
            redsPieces = document.getElementsByClassName("pieceRed");
        }
        if ((board[selectedPiece.boardIndex + number] == 3) || (board[selectedPiece.boardIndex + number] == 11) || (board[selectedPiece.boardIndex + number] == 19) || (board[selectedPiece.boardIndex + number] == 27))
        {
            selectedPiece.isKing == true;
            $("#" + board[selectedPiece.boardIndex + number]).addClass("king");
        }
        redsPieces = document.getElementsByClassName("pieceRed");
    } else { //BLACK turn
        $(document.getElementById(selectedPiece.pieceID)).removeClass("pieceBlack");
        if(selectedPiece.isKing) {
            $("#" + board[selectedPiece.boardIndex + number]).addClass("pieceBlack");
            $("#" + board[selectedPiece.boardIndex + number]).addClass("king");
            blacksPieces = document.getElementsByClassName("pieceBlack");
        } else {
            $("#" + board[selectedPiece.boardIndex + number]).addClass("pieceBlack");
            blacksPieces = document.getElementsByClassName("pieceBlack");
        }
        if ((board[selectedPiece.boardIndex + number] == 4) || (board[selectedPiece.boardIndex + number] == 12) || (board[selectedPiece.boardIndex + number] == 20) || (board[selectedPiece.boardIndex + number] == 28))
        {
            selectedPiece.isKing == true;
            $("#" + board[selectedPiece.boardIndex + number]).addClass("king");
        }
        blacksPieces = document.getElementsByClassName("pieceBlack");
    }
    removePiecesClicks();
}

function capture(pieceID) // remove piece from board and add piece to respective jail
{
    if (turn == true) // red's turn, therefore BLACK PIECE has been captured
    {
        $("#" + board[selectedPiece.boardIndex + pieceID]).removeClass("pieceBlack");
        blackScore++;
        blackID = "b" + blackScore;
        $("#" + blackID).addClass("pieceBlack")
    }
    if (turn == false) // black's turn, therefore RED PIECE has been captured
    {
        $("#" + board[selectedPiece.boardIndex + pieceID]).removeClass("pieceRed");
        redScore++;
        redID = "r" + redScore;
        $("#" + redID).addClass("pieceRed")
    }
    // check for victory
    if (blackScore == 12)
    {
        victoryRed();
    }
    if (redScore == 12)
    {
        victoryBlack();
    }
}

function victoryRed()
{
    alert("Red Wins! Congratulations!");
}

function victoryBlack()
{
    alert("Black Wins! Congratulations!");
}

function removePiecesClicks() { //removes click event listeners for all pieces
    if (turn) { //if it is RED turn
        for(var i = 0; i < redsPieces.length; i++){
            redsPieces[i].removeEventListener("click", getSelectedPiece);
        }
    } else { //if it is BLACK turn
       for(var i = 0; i < blacksPieces.length; i++){
        blacksPieces[i].removeEventListener("click", getSelectedPiece);
        }
    }
    changePlayer();
}

function changePlayer() {// change turn and restart turn cycle
    if (turn) {
        turn = false;
    } else {
        turn = true;
    }
    whoseTurn();
    givePiecesClicks();
}

function whoseTurn() // change which text displays after a move is made
{
    if (turn)
    {
        for (let i = 0; i < redTurn.length; i++) 
        {
            redTurn[i].style.opacity = "100%";
            blackTurn[i].style.opacity = "0%";
        }
    } 
    else 
    {
        for (let i = 0; i < blackTurn.length; i++)
        {
            redTurn[i].style.opacity = "0%";
            blackTurn[i].style.opacity = "100%";
        }
    }
}

givePiecesClicks(); //calls the function that begins turn procedure