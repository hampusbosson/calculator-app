let firstNum = 0;
let currentNum = 0;
let currentOperator = ''; 
let result = '';
let shouldResetScreen = false; 
let evaluatePressed = false; 


const buttons = document.querySelectorAll('.button');
const lastOperation = document.getElementById('upper-display');
const currentOperation = document.getElementById('lower-display'); 
const operators = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

//clearButton.addEventListener('click', clearDisplay());

deleteButton.addEventListener('click', () => deleteNumber());

equalsButton.addEventListener('click', () => evaluate());


buttons.forEach(button => {
    button.addEventListener('click', () => displayNumbers(button.textContent));
});


operators.forEach(op => {
    op.addEventListener('click', () => setOperation(op.textContent)); 
});



function displayNumbers(number) {
    if (/^\d+$/.test(number) || number == '.') {
        if (number === '.' && currentOperation.textContent.includes('.')) {
            return;
        } else if (shouldResetScreen) { 
            currentOperation.textContent = '';
            shouldResetScreen = false; 
        }
        currentOperation.textContent += number;
    }
}


function setOperation(operator) {
    shouldResetScreen = true; 
    currentNum = parseFloat(currentOperation.textContent);
    if (lastOperation.textContent === '') {
        if(operator == '×' || operator == '÷') { 
            currentOperator = operator;
            result = parseFloat(operate(operator, currentNum, 1))
            lastOperation.textContent = result + ' ' + operator;
        } else {
        currentOperator = operator;
        result = parseFloat(operate(operator, currentNum, 0))
        lastOperation.textContent = result + ' ' + operator;
    }

    } else {
        currentOperator = operator;
        firstNum = parseFloat(result);
        result = parseFloat(operate(currentOperator, firstNum, currentNumValue()));
        lastOperation.textContent = parseFloat(result) + ' ' + operator; 
        evaluatePressed = false; 
    }
}

function evaluate() {
    evaluatePressed = true;
    firstNum = result; 
    currentNum = parseFloat(currentOperation.textContent); 
    
    result = parseFloat(operate(currentOperator, firstNum, currentNum)); 

    currentOperation.textContent = parseFloat(result); 
    lastOperation.textContent = `${firstNum} ${currentOperator} ${currentNum} =`;
}

function currentNumValue() {
    if(evaluatePressed && (currentOperator == '×' || currentOperator == '÷')) {
        return 1;
    } else if ((evaluatePressed && result < 0) && (currentOperator == '+' || currentOperator == '-')) {
        return 0; 
    } else {
        let num = parseFloat(currentOperation.textContent);
        return num; 
    }
}

function deleteNumber() {
    let currentText = currentOperation.textContent;
    currentOperation.textContent = currentText.slice(0, -1);
}




function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2; 
}

function multiply(num1, num2) {
    return num1 * num2; 
}

function divide(num1, num2) {
    return num1 / num2; 
}

function operate(operator, num1, num2) {
    let result;
    switch(operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '×':
            result = multiply(num1, num2);
            break;
        case '÷':
            if (num2 === 0) {
                // Handle division by zero if necessary
                return "Error";
            }
            result = divide(num1, num2);
            break;
    }
    return parseFloat(result.toFixed(3)); // Round to two decimal places
}

