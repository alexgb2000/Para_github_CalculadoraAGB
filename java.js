const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'));

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
      display.textContent = '0';
      calculator.dataset.previousKeyType = '';
      calculator.dataset.firstValue = '';
      calculator.dataset.operator = '';
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        //calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    if (action === 'square-root') {
      const calcValue = Math.sqrt(displayedNum);
      display.textContent = calcValue;
      calculator.dataset.previousKeyType = 'unary';
    }

    if (action === 'square') {
      const calcValue = Math.pow(displayedNum, 2);
      display.textContent = calcValue;
      calculator.dataset.previousKeyType = 'unary';
    }

    if (action === 'percentage') {
      const calcValue = displayedNum / 100;
      display.textContent = calcValue;
      calculator.dataset.previousKeyType = 'unary';
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }
  }
});

function calculate(n1, operator, n2) {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);
  if (operator === 'add') return num1 + num2;
  if (operator === 'subtract') return num1 - num2;
  if (operator === 'multiply') return num1 * num2;
  if (operator === 'divide') return num1 / num2;
}
