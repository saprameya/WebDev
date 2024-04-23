var gameOver = false;
const ans = []; 

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

  console.log("294 activeAnsBox: " + activeAnsBox.id);
//Set value of focused answer box 
function getInput(number){
    if(activeAnsBox == null){
        alert("Please click on a box to input a number");
    }
    else{
    console.log("301 activeAnsBox: " + activeAnsBox.id);

        document.getElementById(activeAnsBox.id).value = number;
        activeAnsBox = document.getElementById(activeAnsBox.id).nextElementSibling;
        document.getElementById(activeAnsBox.id).focus();
        // setFocus();
    }

}

//Set active answer box
function setFocus(element, focusID){
    document.getElementById(element.id).focus;
    activeAnsBox = document.getElementById(element.id);

}

//Submit player's answer
function submitAnswer(){
    const playerAnswer = new Array();
    playerAnswer.push(answerBox1.value);
    playerAnswer.push(answerBox2.value);
    playerAnswer.push(answerBox3.value);
    alert(playerAnswer);
}

//Set active answer box to null if player clicks elsewhere on the page (other than an answer box or a button)
function clickOut(){
    if(document.activeElement.className != ".button" && document.activeElement.className != "answer-box"){
        activeAnsBox = null;
    }
}

function submitAnswer(){

    if(!gameOver){
        document.getElementById("answer-box1").value = ans[0];
        document.getElementById("answer-box2").value = ans[1];
        document.getElementById("answer-box3").value = ans[2];

        var ansCount = 0;
          
    }

    for(var i = 0; i < ans.length; i++) {
    
        if(ans[0] == 'X' || ans[1] == 'X' || ans[2] == 'X'){
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
}