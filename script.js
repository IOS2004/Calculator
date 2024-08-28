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
    item.id = 'button-card';
    item.textContent = a[i];
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

function compute (str) 
{
  return '69';
}

buttons.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON')
  {
    let b = e.target;
    let str = b.textContent;
    console.log(str);
    if (output.textContent == '0')
      output.textContent = '';
    switch (str)
    {
      case '.':
        let s = output.textContent[output.textContent.length - 1];
        if (s >= '1' && s <= '9')
          output.textContent = output.textContent +'.';
        else
          output.textContent = output.textContent +'0.';
        break;
      case '=':
        output.textContent = compute(output.textContent);
        break;
      case 'AC':
        output.textContent = '0';
        break;
      case '←':
        output.textContent = output.textContent.slice(0, output.textContent.length - 1);
        if (output.textContent == '')
          output.textContent = '0';
        break;
      default: 
        output.textContent = output.textContent + str;
    }
  }
})