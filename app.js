//1.Take Input value
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput =  document.querySelector('.calculator__input--custom');

//Button (nodelist)
const tipButtons = document.querySelectorAll('.btn-tip');
const resetButton = document.querySelector('.btn-reset');

const tipAmountDisplay = document.querySelectorAll('.result-item__value')[0];
const totalDisplay = document.querySelectorAll('.result-item__value')[1];
const errorMsg = document.querySelector('.calculator__error-msg');

//2.Global state 
let billValue = 0.0;
let tipValue = 0.15
let peopleValue = 1;


//3.func calculate
function calculateTip(){
  if (peopleValue >=1){
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (1 + tipValue)) / peopleValue;

    tipAmountDisplay.innerHTML = "$" + tipAmount.toFixed(2);
    totalDisplay.innerHTML = "$" + total.toFixed(2);

    resetButton.disabled = false;
  }
}

//4.Listen for Bill
billInput.addEventListener('input', () => {
  billValue = Math.abs(parseFloat(billInput.value)) || 0;
  calculateTip();
});

//Listen for custom bill
customTipInput.addEventListener('input', () =>{
  tipValue = parseFloat(customTipInput.value) / 100 ;

  tipButtons.forEach(btn => btn.classList.remove('btn-tip--active'));

  if (!isNaN(tipValue)){
    calculateTip();
  }
});

//listen for number people
peopleInput.addEventListener('input', () => {
  peopleValue = Math.abs(parseFloat(peopleInput.value)) || 0;

  if (peopleValue <= 0) {
    errorMsg.hidden = false;
    peopleInput.style.border = "2px solid #e17052"; 
    tipAmountDisplay.innerHTML = "$0.00";
    totalDisplay.innerHTML = "$0.00";
  } else {
    errorMsg.hidden = true;
    peopleInput.style.border = "2px solid transparent";
    if (isNaN(peopleValue)) peopleValue = 1;
    calculateTip();
  }
});


tipButtons.forEach(button =>{
  button.addEventListener('click', () => {
    // delete class 'active'
    tipButtons.forEach(btn => btn.classList.remove('btn-tip--active'))

    // add class active
    button.classList.add('btn-tip--active');

    // parse text
    tipValue = parseFloat(button.innerHTML) /100 ;

    customTipInput.value = '';

    calculateTip();
  })
})

resetButton.addEventListener('click', () => {
  billValue = 0.0;
  tipValue = 0.15;
  peopleValue = 1;

  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';

  tipAmountDisplay.innerHTML = '$0.00';
  totalDisplay.innerHTML = '$0.00' ;
  errorMsg.hidden = true;

  peopleInput.style.border = "2px solid transparent";
  tipButtons.forEach(btn => btn.classList.remove('btn-tip--active'));

  tipButtons.forEach(btn => {   //reset to default tip
    if (btn.innerHTML === '15%') {
      btn.classList.add('btn-tip--active');
    }
  });

  resetButton.disabled = true ;
})


