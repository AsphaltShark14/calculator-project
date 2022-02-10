const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const screen = document.querySelector('.screen');

let input = "";
let resultsArray = [];
let lastOperator;
let lastButton;
let lastInput;
let resultDisplayed = false;

function enterInput(e) {
    if (lastButton) lastButton.classList.remove('hl');
    if(!resultDisplayed) {
        input += e.target.dataset.key;
        screen.textContent = input;
    } else {
        resultDisplayed = false;
        input = e.target.dataset.key;
        screen.textContent = input;
    }

    lastInput = parseFloat(input);
}

function operateInput(e) {
    resultsArray.length == 2 ? resultsArray = [input] : resultsArray.push(parseFloat(input));
    
    if (!resultDisplayed) {
        this.classList.add('hl');
        resultDisplayed = true;
    } else {
        lastButton.classList.remove('hl');
        this.classList.add('hl');
    }

    if (resultsArray.length == 2) {
        resultEqual();
    }

    lastOperator = e.target.dataset.key;
    lastButton = this;
}

function resultEqual() {
    if (!lastOperator) return;
    resultsArray.length >= 2 ? resultsArray = [input,lastInput] : resultsArray.push(parseFloat(input));

    switch (lastOperator) {
        case ('+'):
            input = resultsArray[0] + resultsArray[1];
            break;
        case ('-'):
            input = resultsArray[0] - resultsArray[1];
            break;
        case ('*'):
            input = resultsArray[0] * resultsArray[1];
            break;
        case ('/'):
            input = resultsArray[0] / resultsArray[1];
            break;
    }


    if (input === Infinity) {
                input = "ERROR";
            }

    screen.textContent = input;
}

function clearInput() {
    input = "";
    screen.textContent = "";
    lastOperator = "";
    if (lastButton) lastButton.classList.remove('hl');
    resultsArray = [];
}

clear.addEventListener('click', clearInput);
numbers.forEach(number => number.addEventListener('click', enterInput));
operators.forEach(operator => operator.addEventListener('click', operateInput));
equal.addEventListener('click', resultEqual);