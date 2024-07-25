document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.calculator button');
  let currentInput = '';
  let firstOperand = '';
  let operator = '';
  let result = '';

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const value = button.getAttribute('value');

      if (!isNaN(value) || value === '0') {
        currentInput += value;
        display.value += value;
      } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (currentInput !== '') {
          if (firstOperand === '') {
            firstOperand = currentInput;
          } else if (operator !== '') {
            firstOperand = calculate(firstOperand, operator, currentInput);
          } else {
            firstOperand = currentInput;
          }
          operator = value;
          display.value += ' ' + value + ' ';
          currentInput = '';
        }
      } else if (value === '=') {
        if (operator !== '' && currentInput !== '') {
          result = calculate(firstOperand, operator, currentInput);
          display.value = result;
          currentInput = '';
          firstOperand = '';
          operator = '';
        }
      } else if (value === 'C') {
        currentInput = '';
        firstOperand = '';
        operator = '';
        display.value = '';
      }
    });
  });

  function calculate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
      case '+':
        return (num1 + num2).toString();
      case '-':
        return (num1 - num2).toString();
      case '*':
        return (num1 * num2).toString();
      case '/':
        if (num2 === 0) return 'Error'; 
        return (num1 / num2).toString();
      default:
        return 'Error'; 
    }
  }
});
