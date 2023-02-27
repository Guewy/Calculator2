const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equalsB");
const clearButton = document.getElementById("clearB");
const expressionScreen = document.getElementById("expressionS");
const display = document.getElementById("displayS");

let check = 0;
let pastOperator = '';
let pastNum = 0;

//the numbers to the left and right of the operator
let firstNo = 0;
let secondNo = 0;

//Error check variable
let errorCheck = 0;


numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        displayF(button.textContent)
    });
  });

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operation(button.textContent)
    });
  });

equalsButton.addEventListener("click", equals)
clearButton.addEventListener("click", clear)

function add(a,b){return Number(a)+Number(b);}
function subtract(a,b){return a-b;}
function multiply(a,b){return a*b;}
function divide(a,b){return a/b;}

function displayF(number){
    //Checks for error to reset the screen
    if(errorCheck == 1){
        clear();
    }
    if(display.textContent == 0){
        display.textContent = number;
        secondNo = display.textContent;
        console.log("secondNo is " + secondNo);
    }
    else {
        display.textContent += number;
        secondNo = display.textContent;
        console.log("secondNo is " + secondNo);
    }
}

function operation(operator){
    console.log("start of operator firstNo is " + firstNo)
    //Check for double operator press
    let lastChar = expressionScreen.textContent[expressionScreen.textContent.length - 1];
    if( lastChar == "+" && display.textContent == "" || 
        lastChar == "-" && display.textContent == "" || 
        lastChar == "×" && display.textContent == "" || 
        lastChar == "÷" && display.textContent == "" ) {
        //replace the char and update the last operator
        expressionScreen.textContent = expressionScreen.textContent.replace("+", operator);
        expressionScreen.textContent = expressionScreen.textContent.replace("-", operator);
        expressionScreen.textContent = expressionScreen.textContent.replace("×", operator);
        expressionScreen.textContent = expressionScreen.textContent.replace("÷", operator);
        pastOperator = operator;
        return;
    }

    //check if this is the first input operator, if so:
    if(check == 0){
        expressionScreen.textContent = display.textContent + " " + operator; 
        pastNum = display.textContent;
        check = 1;
        //Move the secondNo to the firstNo position
        console.log("In check 0, firstNo is " + firstNo + " second no is " + secondNo);
        firstNo = display.textContent;
        console.log("After change, firstNo is " + firstNo + " second no is " + secondNo);
    }
    //else compute and change display
    else {
        console.log("Check is 1: " + check);
        console.log("First no is: " +firstNo);
        console.log("pastOperator is: " +pastOperator);
        console.log("Second no is: " +secondNo);
        if(secondNo == 0 && pastOperator == "÷"){
            console.log("Tried to div by 0")
            display.textContent = "Error - Can't divide by 0";
            errorCheck = 1;
            expressionScreen.textContent = "";
            check = 0;
            pastOperator = '';
            return 
        }
        else { 
            firstNo = compute(firstNo, pastOperator, secondNo);
            console.log("Result is " + firstNo);
            console.log("New operator is: " +operator);
            expressionScreen.textContent = firstNo + " " + operator;
        }
    }
    //Set past Operator for compute function
    pastOperator = operator;
    display.textContent = "";
}

function compute(a, operator, b){
    console.log("In the compute")
    console.log("a is: " + a);
    console.log("operator is: " + operator);
    console.log("b is: " + b);
    if(operator == "+"){ return (add(a,b))}
    if(operator == "-"){ return (subtract(a,b))}
    if(operator == "×"){ return (multiply(a,b))}
    if(operator == "÷"){
        if(b == 0){
            console.log("Tried to div by 0")
            display.textContent = "Error - Can't divide by 0";
            errorCheck = 1;
            expressionScreen.textContent = "";
            check = 0;
            pastOperator = '';
            return 
        }
        else{ return divide(a,b)}
    }
}

function equals() {
    //Check for no input
    let lastChar = expressionScreen.textContent[expressionScreen.textContent.length - 1];
    if( lastChar == "+" && display.textContent == "" || 
        lastChar == "-" && display.textContent == "" || 
        lastChar == "×" && display.textContent == "" || 
        lastChar == "÷" && display.textContent == "" ) {
        //display.textContent = "Invalid expression";
        //errorCheck = 1;
        return;
    }

    console.log("In the =:");
    console.log("First no is: " +firstNo);
    console.log("pastOperator is: " +pastOperator);
    console.log("Second no is: " +secondNo);
    expressionScreen.textContent = firstNo + " " + pastOperator + " " + secondNo + " =";

    if(secondNo == 0 && pastOperator == "÷"){
        console.log("Tried to div by 0")
        display.textContent = "Error - Can't divide by 0";
        errorCheck = 1;
        expressionScreen.textContent = "";
        check = 0;
        pastOperator = '';
        return 
    }
    else{
        firstNo = compute(firstNo, pastOperator, secondNo);
        console.log("Result is: " +firstNo);
        display.textContent = firstNo;
        check = 0;  
    }
}

function clear() {
    //return expression screen to ""
    expressionScreen.textContent = "";
    //return main screen to "0"
    display.textContent = "0";
    //reset operator
    check = 0;
    pastOperator = '';
    //reset numbers
    firstNo = 0;
    secondNo = 0;
    //errorCheck
    errorCheck = 0;
}