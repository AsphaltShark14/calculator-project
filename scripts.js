const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const screen = document.querySelector('.screen');
let input = "";
let count;
let resultsArray = [];
let lastOperator;
let lastButton;
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
}

function operateInput(e) {
    resultsArray.push(parseFloat(input));
    if (!resultDisplayed) {
        this.classList.add('hl');
        resultDisplayed = true;
    }

    lastOperator = e.target.dataset.key;
    lastButton = this;
}

function resultEqual() {
    resultsArray.push(parseFloat(input));
    
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

    screen.textContent = input;
    resultsArray = [];
}

function clearInput() {
    input = "";
    screen.textContent = "";
}

clear.addEventListener('click', clearInput);
numbers.forEach(number => number.addEventListener('click', enterInput));
operators.forEach(operator => operator.addEventListener('click', operateInput));
equal.addEventListener('click', resultEqual);