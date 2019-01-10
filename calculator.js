const calcKeys = document.querySelector('.calculator__keys');
const opKeys = calcKeys.getElementsByClassName('key--operator');
const calcDisplay = document.querySelector('.calculator__display');
calcKeys.addEventListener('click', appendExpression);

var expression = '';
var answer = '';
var operators = [
    {key: '×',
     operator: '*'},
    {key: '÷',
     operator: '/'},
    {key: '+',
     operator: '+'},
    {key: '-',
     operator: '-'}];

function appendExpression(e) {
    if (e.target.textContent === '=') {
        if (answer !== '') {
            calcDisplay.textContent = answer;
        }
        else if (expression === '') {
            calcDisplay.textContent = '0';
        }
        else {
            try {
                answer = eval(expression);
            }
            catch(err) {
                return;
            }
            calcDisplay.textContent = answer;
            expression = '';
        }
    }
    else if (e.target.textContent === 'AC') {
        expression = '';
        calcDisplay.textContent = '0';
        answer = '';
        removeDepression();
    }   
    else if (e.target.textContent === '.') {
        validToAppendDecimal = true;
        opKey = null;
        for (i = expression.length - 1; i >= 0; i--) {
            if (isNaN(expression.charAt(i))) {
                if (expression.charAt(i) === '.') {
                    validToAppendDecimal = false;
                }
                else {
                    opKey = expression.charAt(i);
                }
                break;
            }
        }
        if (validToAppendDecimal) {
            if (answer !== '' || (opKey && isNaN(expression.charAt(expression.length - 1)))) {
                removeDepression();
                calcDisplay.textContent = '0.';
            }
            else {
                calcDisplay.textContent += '.'; 
            }
            expression += '.';
        }
        answer = '';
    }
    else if (isOperatorKey(e.target.textContent)) {
        let lastValueInExpression = expression.charAt(expression.length - 1);
        if (isOperator(lastValueInExpression)) {
            expression = expression.slice(0, expression.length - 1);
        }
        else if (answer !== '') {
            expression = answer;
            answer = '';
        }
        e.target.classList.add('is-depressed');
        expression += convertOperatorKey(e.target.textContent);
    }
    else {
        let lastValueInExpression = expression.charAt(expression.length - 1);
        if (expression === '' || 
            isOperator(lastValueInExpression) || 
            (calcDisplay.textContent === '0' && e.target.textContent === '0')) {
                removeDepression();
                calcDisplay.textContent = e.target.textContent;
        }
        else {
            calcDisplay.textContent += e.target.textContent;
        }
        expression += e.target.textContent;  
        answer = '';
    }
}

function isOperatorKey(value) {
    for (i = 0; i < operators.length; i++) {
        if (operators[i].key === value) {
            return true;
        }
    }
    return false;
}

function isOperator(value) {
    for (i = 0; i < operators.length; i++) {
        if (operators[i].operator === value) {
            return true;
        }
    }
    return false;
}

function convertOperatorKey(value) {
    for (i = 0; i < operators.length; i++) {
        if (operators[i].key === value) {
            return operators[i].operator;
        }
    }
}

function removeDepression() {
    for (i = 0; i < opKeys.length; i++) {
        if (opKeys[i].classList.contains('is-depressed')) {
            opKeys[i].classList.remove('is-depressed');
            return;
        }
    }
}