let buttons = document.querySelector('.buttons');
let output = document.querySelector('.output');

function addButtons()
{
  // add 20 buttons
  let a = [
    '%', 'AC', '←', '/',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '√x', '0', '.', '='
  ]
  for (let i = 0; i < 20; i++)
  {
    let item = document.createElement('button');
    item.classList = 'button-card';
    item.id = 'button' + a[i];
    item.textContent = a[i];
    switch (a[i])
    {
      case '/':
      case '×':
      case '+':
      case '-':
      case '%':
      case '←':
      case 'AC': 
        item.style.backgroundColor = '#aaaaaa50';
        item.addEventListener('mouseover', () => { item.style.opacity = 0.75 });
        item.addEventListener('mouseout', () => { item.style.opacity = 1 });
    }
    buttons.appendChild(item);
    if (a[i] == '=')
    {
      item.style.backgroundColor = 'darkblue';
      item.addEventListener('mouseover', () => { item.style.opacity = 0.75 });
      item.addEventListener('mouseout', () => { item.style.opacity = 1 });
    }
  }
}
addButtons();

function evaluate (op1, op2, oper)
{
  switch (oper)
  {
    case '+':
      return op1 + op2;
    case '-':
      return op1 - op2;
    case '×':
      return op1 * op2;
    case '/':
      return op1 / op2;
    case '%':
      return op1 % op2;
    default:
      return 'Invalid input'
  }
}

function compute (str) 
{
  // compute a set of operand at a time from right to left
  let ind = 0;
  let comp = '';
  if (str[ind] == '-')
  {
    comp = '-';
    ind++;
  }
  while (ind < str.length && ((str[ind] <= 9 && str[ind] >= 0) || str[ind] == '.'))
  {
    comp += str[ind];
    ind++;
  }
  let i = ind;
  let oper = str[i];
  i++;
  let op2 = '';
  if (str[i] == '-')
  {
    op2 = '-';
    i++;
  }
  while (i < str.length && ((str[i] <= 9 && str[i] >= 0) || str[i] == '.'))
  {
    op2 += str[i];
    i++;
  }
  comp = evaluate(Number(comp), Number(op2), oper);
  ind = i;
  if (isNaN(comp))
    return 'Invalid Input';
  return (typeof comp == 'number' ) ? comp.toFixed(10) : comp;
}

function isValidComp(str) 
{
  if (!isNaN(Number(str)))
    return false;
  if (isOperEnd(str))
    return false;
  for (let i = 0; i < str.length; i++)
  {
    switch (str[i]) {
      case '%':
      case '×':
      case '+':
      case '-':
      case '/':
        return true;
    }
  }
  return false;
}

function convInt(str)
{
  let j = str.length - 1;
  while ((str[j] == '0'))
  {
    j--;
    if (str[j] == '.')
    {
      j--;
      break;
    }
  }
  return str.substr(0, j + 1);
}

function isOperEnd(str)
{
  switch (str[str.length - 1]) {
    case '%':
    case '×':
    case '+':
    case '-':
    case '/':
      return true;
    default:
      return false;
  }
}

function disableDecimal(str)
{
  // check if the current operand is allowed to use decimal
  let i = str.length - 1;
  while (i >= 0 && !isOperEnd(str[i]))
  {
    if (str[i] == '.')
      return true;
    i--;
  }
  return false;
}

buttons.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON')
  {
    let b = e.target;
    let str = b.textContent;
    if (output.textContent == '0' && (str >= '0' && str <= '9' || str == '.'))
      output.textContent = '';
    if (output.textContent[0] == 'I' || output.textContent == 'NaN')
    {
      output.textContent = '';
    }
    switch (str)
    {
      case '%':
      case '×':
      case '+':
      case '-':
      case '/':
        if (isValidComp(output.textContent))
          output.textContent = convInt(compute(output.textContent));
        if (isOperEnd(output.textContent))
          output.textContent = output.textContent.slice(0, output.textContent.length - 1);
        output.textContent = output.textContent + str;
        break;
      case '.':
        if (disableDecimal(output.textContent))
          break;
        let s = output.textContent[output.textContent.length - 1];
        if (s >= '1' && s <= '9')
          output.textContent = output.textContent +'.';
        else
          output.textContent = output.textContent +'0.';
        break;
      case '=':
        if (isValidComp(output.textContent))
        {
          output.textContent = convInt(compute(output.textContent));
        }
        if (output.textContent == '')
          output.textContent = '0';
        break;
      case 'AC':
        output.textContent = '0';
        break;
      case '←':
        output.textContent = output.textContent.slice(0, output.textContent.length - 1);
        if (output.textContent == '')
          output.textContent = '0';
        break;
      case '√x':
        if (!isNaN(Number(output.textContent)))
        {
          output.textContent = convInt(Math.sqrt(Number(output.textContent)).toFixed(10));
          if (isNaN(output.textContent))
            output.textContent =  'Invalid Input';
        }
        break;
      default: 
        output.textContent = output.textContent + str;
    }
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter')
    document.getElementById('button' + '=').click();
  else if (event.key === 'Backspace')
    document.getElementById('button' + '←').click();
  else if (event.key == '*')
    document.getElementById('button' + '×').click();
  else 
  {
    let b = document.getElementById('button' + event.key);
    if (b != null)
      b.click();
  }
})