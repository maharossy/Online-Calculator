// Inputs
const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term');

// Cleave options formating
const cleavePriseSetting = {
    numeral: true,
    delimiter: ' ',
    nemeralThousandsGroupStyle: 'thousand',
    
}

// Launch formating cleave
const cleaveCost = new Cleave(inputCost, cleavePriseSetting),
      cleaveDownPayment = new Cleave(inputDownPayment, cleavePriseSetting);

