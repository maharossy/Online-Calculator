import {priceFormatter} from './formatters.js';

// Inputs
const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term'),
      form = document.querySelector('#form'),
      totalCost = document.querySelector('#total-cost'),
      totalMonthPayment = document.querySelector('#total-month-payment');

// Cleave options formating
const cleavePriseSetting = {
    numeral: true,
    delimiter: ' ',
    nemeralThousandsGroupStyle: 'thousand',
    
}

// Launch formating cleave
const cleaveCost = new Cleave(inputCost, cleavePriseSetting),
    cleaveDownPayment = new Cleave(inputDownPayment, cleavePriseSetting),

    cleaveTerm = new Cleave(inputTerm, cleavePriseSetting);

calcMortgage();


// Show and calculation of the loan amount
form.addEventListener('input', () => {
    // Credit amount
    calcMortgage();
});


function calcMortgage() {
    //Total credit amount
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);

    //mortgage term
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const mounthRate = creditRate / 12;

    //Credit years
    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    //Monthly payment calculation
    const mounthPayment = (totalAmount * mounthRate) / 1 - (1 + mounthRate) * (1 - months);
    totalMonthPayment.innerText = mounthPayment.toFixed(2);
}