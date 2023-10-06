let num1 = 0; 
let num2 = 0; 
let operator = ''; 
let numbers1 = [];
let numbers2 = []; 
let equalsActive = false;
let opActive = false; 


const buttons = document.querySelectorAll('.button');
const lastOperation = document.getElementById('upper-display');
const currentOperation = document.getElementById('lower-display'); 
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');


buttons.forEach(button => {
    button.addEventListener('click', function(){
        const number = button.textContent;
        displayNumbers(number);
        storeNumbers(number);
        if(opActive == true) {
            console.log(numbers1);
        }

    });
});

operators.forEach(op => {
    op.addEventListener('click', function() {
        opActive = true; 
        lastOperation.textContent = numbers1.join('') + ' ' + op.textContent;
    })
});

equals.addEventListener('click', function() {
    equalsActive = true
});



function displayNumbers (number) {
    if (/^\d+$/.test(number) || number == '.' && !currentOperation.textContent.includes('.')) {
        currentOperation.textContent += number;
    } else if (/^\d+$/.test(number)) {
        currentOperation.textContent += number;
    } 
}

function storeNumbers(value) {
    if (/^\d+$/.test(value) || value == '.') {
        numbers1.push(value);
    } 


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

function operate(operator, num1, num2){
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

