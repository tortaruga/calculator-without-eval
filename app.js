// theme switcher
const toggles = document.querySelectorAll('[name=theme]');

// set theme 
function setTheme(e) {
    const theme = e.target.id;
    document.querySelector('body').setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
}

// Initialize the theme based on the saved preference
function initializeTheme() {
    let savedTheme;

    if (localStorage.getItem('preferredTheme')) {
        savedTheme = localStorage.getItem('preferredTheme')
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            savedTheme = 'theme-three'
        } else {
            savedTheme = 'theme-one'
        }    
    }

    document.querySelector('body').setAttribute('data-theme', savedTheme);

    // Set the correct radio button to checked 
    const radioButton = document.getElementById(savedTheme);
    if (radioButton) {
        radioButton.checked = true;
    }
}

// set theme on click
toggles.forEach(toggle => {
    toggle.addEventListener('click', setTheme);
});

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', initializeTheme);


// calculator  

const btns = document.querySelectorAll('.btn'); 

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnValue = btn.textContent;
        const display = document.querySelector('.display');

        if (btnValue === 'del') {
            display.value = display.value.slice(0, -1);
        } else if (btnValue === 'reset') {
            display.value = '';
        } else if (btnValue === '=') { 
            calculate(display.value) == 'Infinity' || isNaN(calculate(display.value)) ? 
            display.value = 'Error' :
            display.value = calculate(display.value);
        } else {
            display.value += btnValue
        }
    })
})

addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const display = document.querySelector('.display');
        calculate(display.value) == 'Infinity' || isNaN(calculate(display.value)) ? 
        display.value = 'Error' :
        display.value = calculate(display.value);
    }
})

function calculate(expression) {
    // convert expression to postfix notation
    const postfix = infixToPostfix(expression);
    // evaluate converted expression
    const result = evaluatePostfix(postfix);
    // return result to display 
    return result;
}

function infixToPostfix(expression) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    
    const operators = [];
    const output = [];
    // divide expression in numbers and operators
    const tokens = expression.match(/\d+(\.\d+)?|\+|\-|\*|\//g);
    
    tokens.forEach(token => {
        // if token is a number push it to output
        if (/\d/.test(token)) {
            output.push(token);
        } else if (/\+|\-|\*|\//.test(token)) { 
            // if token is operator:
            // if the last operator in the array has higher or equal precedence remove it and push it to the output array
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            // keep doing until there's either no more operators in the array or the last one has lower precedence
            // at which point you push the token to the operators array
            operators.push(token);
        }
    });
    
    // when we have done all this mess for each token we push the remaining operators in the output array
    // starting from the last
    while (operators.length) {
        output.push(operators.pop());
    }
    
    // we now return our array of tokens in the right order (postfix notation)
    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];
    
    postfix.forEach(token => {
        // if token (string) contains numbers we convert it to type Number and push it to  stack
        if (/\d/.test(token)) {
            stack.push(Number(token));
        } else {
            // else we grab the last two numbers in the stack and perform our calculation:
            // based on the operator we have encountered
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    });
    
    // at this point we have an array containing only one element:
    // the result of our expression
    return stack[0];
}

