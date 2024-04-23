// variables and declarations for setup
var answerBox = document.activeElement;
var activeAnsBox = document.getElementById("answer-box1");
const answerBox1 = document.getElementById("answer-box1");
const answerBox2 = document.getElementById("answer-box2");
const answerBox3 = document.getElementById("answer-box3");

// variables used to set up clues
var twoCorrClueArray = new Array();
var oneCorrClueArray = new Array();
var wellPlClueArray = new Array();
var noCorrClueArr = new Array();
const existingNums = new Set();
var nonExistingNums = new Set();
const clueSize = 3;
var wellPlacedIndex = -1;
var corrNotPlacedIndex1 = -1;
var corrNotPlacedIndex2 = -1;
var wellPlacedNum = -1;
var corrNotPlacedNum1 = -1;
var corrNotPlacedNum2 = -1;

// variables to get player's answer
document.getElementsByClassName("answer-inputs");

answerBox1.value = null;
answerBox2.value = null;
answerBox3.value = null;

load();

function load(){
    setIndexes();
    generateWellPlacedClue();
    generateTwoCorrClue();
    generateOneCorrClue();
    generateNoCorrClue();
    setClues();
}


// set random indexes for well placed and wrongly placed numbers
function setIndexes(){
    // generate well placed index
    wellPlacedIndex = Math.floor(Math.random()*clueSize);

    // generate first correct not placed index
    while(corrNotPlacedIndex1 == -1 || corrNotPlacedIndex1 == wellPlacedIndex){
        corrNotPlacedIndex1 = Math.floor(Math.random()*clueSize);
    }

    // set second correct not placed index
    for(var i = 0; i<clueSize; i++){
        if(i != wellPlacedIndex && i != corrNotPlacedIndex1){
            corrNotPlacedIndex2 = i;
            break;
        }
    }

}

// Generate well placed clue
function generateWellPlacedClue(){
    
    var tempSet = new Set();
    var randomNumber = Math.floor(Math.random()*10);
    for(var i = 0; i < clueSize; i++){
        
        while(tempSet.has(randomNumber)){
            randomNumber = Math.floor(Math.random()*10);
        }
        tempSet.add(randomNumber);
        
    }
    wellPlClueArray = Array.from(tempSet);
    wellPlacedNum = wellPlClueArray[wellPlacedIndex];

    existingNums.add(wellPlacedNum);
    
    
    for(var i = 0; i < clueSize; i++){
        
        if(wellPlClueArray[i] != wellPlacedNum){
            nonExistingNums.add(wellPlClueArray[i]);
        }
    }

}

// Generate two correct clue
function generateTwoCorrClue(){

    var clueArray = new Array();
    var randomNumber = Math.floor(Math.random()*10);

    //Add two random numbers that do not belong to non-existent numbers array
    while(clueArray.includes(randomNumber) || nonExistingNums.has(randomNumber)){
        randomNumber = Math.floor(Math.random() * 10);
    }
    clueArray[corrNotPlacedIndex1] = randomNumber;
    corrNotPlacedNum1 = randomNumber;
        
    randomNumber = Math.floor(Math.random() * 10);

    while(clueArray.includes(randomNumber) || nonExistingNums.has(randomNumber)){
        randomNumber = Math.floor(Math.random() * 10);
    }
    clueArray[corrNotPlacedIndex2] = randomNumber;
    corrNotPlacedNum2 = randomNumber;

    //Add one additional random number to clue array
    while(clueArray.includes(randomNumber) || existingNums.has(randomNumber)){
        randomNumber = Math.floor(Math.random() * 10);
    }
    clueArray[wellPlacedIndex] = randomNumber;

    corrNotPlacedIndex1 = clueArray.indexOf(corrNotPlacedNum1);
    corrNotPlacedIndex2 = clueArray.indexOf(corrNotPlacedNum2);

    if(!existingNums.has(corrNotPlacedNum1) && !nonExistingNums.has(corrNotPlacedNum1)){
        existingNums.add(corrNotPlacedNum1);
    }

    if(!existingNums.has(corrNotPlacedNum2) && !nonExistingNums.has(corrNotPlacedNum2)){
        existingNums.add(corrNotPlacedNum2);
    }

    for(let i = 0; i < clueArray.length; i++){
        if(!existingNums.has(clueArray[i]) && !nonExistingNums.has(clueArray[i])){
            nonExistingNums.add(clueArray[i]);
        }
    }

    twoCorrClueArray = clueArray;
    
}

// Generate one correct clue
function generateOneCorrClue(){
    var clueArray = new Array();
    var randomNumber = Math.floor(Math.random()*10);
    
    //if enough existent numbers exist, pick one from those
    if (existingNums.size > clueSize-1){
        var tempExisting = Array.from(existingNums);
        let randIndex = Math.floor(Math.random() * clueSize);
        clueArray.push(tempExisting[randIndex]);
    }
    else{
        while(nonExistingNums.has(randomNumber)){
            randomNumber = Math.floor(Math.random() * 10);
        }
        clueArray.push(randomNumber);
    }

    
    //Add two numbers that are not already existing numbers
    while(clueArray.length < clueSize) {

        randomNumber = Math.floor(Math.random() * 10);
        while(clueArray.includes(randomNumber) || (existingNums.has(randomNumber))){
            randomNumber = Math.floor(Math.random() * 10);
        }
        clueArray.push(randomNumber);
    }

    let existentNumCount = 0;
    for(let i = 0; i < clueArray.length; i++){
        if(existingNums.has(clueArray[i])){
            existentNumCount++;
        }
    }

    if(existentNumCount == 0){
        randIndex = Math.floor(Math.random() * clueSize);
        while(existingNums.has(clueArray[randIndex])){
            randIndex = Math.floor(Math.random() * clueSize);
    
        }
        if(wellPlacedNum == corrNotPlacedNum1){
            corrNotPlacedNum1 = clueArray[randIndex];
            existingNums.add(clueArray[randIndex]);
        }
        else if (wellPlacedNum == corrNotPlacedNum2){
            corrNotPlacedNum2 = clueArray[randIndex];
            existingNums.add(clueArray[randIndex]);
        }
    }

    for(let i = 0; i < clueArray.length; i++){
        if(clueArray[i] == corrNotPlacedNum1 || clueArray[i] == corrNotPlacedNum2 || clueArray[i] == wellPlacedNum){
            existingNums.add(clueArray[i]);
        }
        else {
            nonExistingNums.add(clueArray[i]);
        }
    }

    clueArray = shuffle(clueArray);

    if(clueArray.includes(wellPlacedNum)){
        while(clueArray.indexOf(wellPlacedNum) == wellPlacedIndex){
            clueArray = shuffle(clueArray);
        }
    }
    else if(clueArray.includes(corrNotPlacedNum1)){
        while(clueArray.indexOf(corrNotPlacedNum1) == corrNotPlacedIndex2){
            clueArray = shuffle(clueArray);
        }
    }
    else if(clueArray.includes(corrNotPlacedNum2)){
        while(clueArray.indexOf(corrNotPlacedNum2) == corrNotPlacedIndex1){
            clueArray = shuffle(clueArray);
        }
    }
    oneCorrClueArray = clueArray;
}
   
//Generate no correct clue
function generateNoCorrClue(){

    var clueArray = [];

    while(clueArray.length < clueSize) {
        var randomNum = Math.floor(Math.random() * 10);
        if(!clueArray.includes(randomNum) && !existingNums.has(randomNum)) {
            clueArray.push(randomNum);
            if(!nonExistingNums.has(randomNum)){
                nonExistingNums.add(randomNum);
            }
        }
    }
    noCorrClueArr = clueArray;
}

// Set clues from randomly generated number sets
function setClues(){
    let clueArray = [
        {clue: wellPlClueArray.join(""), message:"One number is correct and well placed"},
        
        {clue:twoCorrClueArray.join(""), message:"Two numbers are correct but wrongly placed"},
        {clue:oneCorrClueArray.join(""), message:"One number is correct but wrongly placed"},
        {clue:noCorrClueArr.join(""), message:"Nothing is correct"}

    ];
    clueArray = shuffle(clueArray);
    let clue1 = "<p>"+clueArray[0].clue +"</p><p>" + clueArray[0].message +"</p>";
    document.getElementById("clue1").innerHTML = clue1;
    let clue2 = "<p>"+clueArray[1].clue +"</p><p>" + clueArray[1].message +"</p>";
    document.getElementById("clue2").innerHTML = clue2;    
    let clue3 = "<p>"+clueArray[2].clue +"</p><p>" + clueArray[2].message +"</p>";
    document.getElementById("clue3").innerHTML = clue3;    
    let clue4 = "<p>"+clueArray[3].clue +"</p><p>" + clueArray[3].message +"</p>";
    document.getElementById("clue4").innerHTML = clue4;
}








// Shuffle arrays 
function shuffle(array){
    
    let shuffledArray = [];
    let i = 0;
        
    while(i < array.length){
        let randomNum = Math.floor(Math.random() * array.length);
        if(!shuffledArray.includes(array[randomNum])) {
            shuffledArray.push(array[randomNum]);
            i++;
        }
        
    }
    return shuffledArray;
}

