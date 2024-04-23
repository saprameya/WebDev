var gameOver = false;
var gameWon = true;

// Prevent keyboard input
document.addEventListener('keydown', function (event) {
    event.preventDefault();
  });
  
  document.addEventListener('keypress', function (event) {
    event.preventDefault();
  });
  
  document.addEventListener('keyup', function (event) {
    event.preventDefault();
  });

//Set value of focused answer box 
function getInput(number){
    if(!gameOver){
        if(activeAnsBox == null){
            alert("Please click on a box to input a number");
        }
        else{
            document.getElementById(activeAnsBox.id).value = number;
            activeAnsBox = document.getElementById(activeAnsBox.id).nextElementSibling;
            document.getElementById(activeAnsBox.id).focus();
        }
    }


}

//Set active answer box
function setFocus(element, focusID){
    document.getElementById(element.id).focus;
    activeAnsBox = document.getElementById(element.id);

}



//Set active answer box to null if player clicks elsewhere on the page (other than an answer box or a button)
function clickOut(){
    if(document.activeElement.className != ".button" && document.activeElement.className != "answer-box"){
        activeAnsBox = null;
    }
}

function submitAnswer(){
    
    if(!gameOver){
        var ans = new Array();
        ans.push(document.getElementById("answer-box1").value);
        ans.push(document.getElementById("answer-box2").value);
        ans.push(document.getElementById("answer-box3").value);
        var ansCount = 0;
          
    }

    for(var i = 0; i < ans.length; i++) {
    
        if(ans[0].length == 0 || ans[1].length == 0 || ans[2].length == 0){
            alert("You must input all three numbers");
            break;            
        }
        if ( isNaN(parseFloat(ans[i])) && !isFinite(ans[i]) ) {
            alert("You must input all three numbers");
            break;
        }
        if(ans[0] == ans[1] || ans[0] == ans[2] || ans[1] == ans[2]){
            alert("Duplicate digits is not allowed");
            break;
        }
        else{
            ansCount++;
        }
    
    }
    
    var answerArray = [];
    for(var i = 0; i < ans.length; i++) {
        answerArray[i] = parseInt(ans[i]);
    }

    if(ansCount == clueSize){
        checkAnswer(answerArray);
        if (gameWon == false){
            alert("Sorry you didn't crack the code.");
            // var popup = document.getElementById("popup-lost");
            // popup.classList.add("open-popupLost");
        }
        else {
            // var popup = document.getElementById("popup-won");
            // popup.classList.add("open-popupWon");
            alert("You cracked the code!");
            
        }
        
    }

}

function checkAnswer(answer){
    gameWon = checkWellPlaced(answer);

    if(gameWon){
        gameWon = checkTwoCorrect(answer);

        if(gameWon){

            gameWon = checkOneCorrect(answer);
            if(gameWon){
                gameWon = checkNoCorrect(answer);
            }
        }

    }
    gameOver = true;
}

function checkWellPlaced(answer){
    var wpAns = -1;
    var wellPlacedCount = 0;

    for(var i = 0; i < answer.length; i++){
        if(wellPlClueArray.includes((answer[i]))){
            wpAns = answer[i];
            wellPlacedCount++;
        }
    }
    if (wellPlacedCount != 1){

        gameWon = false;
    }
    else{

        if(answer.indexOf(wpAns) != wellPlClueArray.indexOf(wpAns)){
            gameWon = false;
        }
    }
    
    return gameWon;
} 

function checkTwoCorrect(answer){
    var twoCorrectCount = 0;
    var cp1 = -1;
    var cp2 = -1;

    for(var i = 0; i < answer.length; i++){
        if(twoCorrClueArray.includes(answer[i])){
            if(cp1 < 0){
                cp1 = answer[i];

            }
            else{
                cp2 = answer[i];
            }
            twoCorrectCount++;
        }

    }
    if(twoCorrectCount == 2){
        
        if(answer.indexOf(cp1)==twoCorrClueArray.indexOf(cp1)){
            gameWon = false;
        }
        if (answer.indexOf(cp2)==twoCorrClueArray.indexOf(cp2)){
            gameWon = false;
        }
        
    }
    else {
        gameWon = false;
    }
    return gameWon;
}

function checkOneCorrect(answer){
    let oneCorrectCount = 0;
    let correct = -1;
    for(let i = 0; i < answer.length; i++){
        if(oneCorrClueArray.includes(answer[i])){
            correct = answer[i];
            oneCorrectCount++;
        }
    }
    if (oneCorrectCount != 1){
        gameWon = false;
    }
    else{
        for(let i = 0; i < answer.length; i++){
            if(answer.indexOf(correct)  == oneCorrClueArray.indexOf(correct)){
                gameWon = false;
                break;
            }
        }
    }

   
    return gameWon;

}

function checkNoCorrect(answer){
    for(let i = 0; i < answer.length; i++){
        if(noCorrClueArr.includes(answer[i])){
            gameWon = false;
            break;
        }
    }
    return gameWon;
}