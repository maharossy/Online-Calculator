import {priceFormatter, priceFormatterDecimals} from './formatters.js';

const maxPrice = 100000000;

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

    let cost = +cleaveCost.getRawValue();

    // Сhecking that the amount of real estate is not more than the maximum
    if (cost > maxPrice) {
        cost = maxPrice;
    }

    //Total credit amount
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);

    //mortgage term
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = (creditRate * 100) / 12;

    //Credit years
    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    //Monthly payment calculation
    const mounthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));

    // Show monthly payment calculation
    totalMonthPayment.innerText = priceFormatterDecimals.format(mounthPayment);
}

// Slider Cost
const sliderCost = document.querySelector('#slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        min: 0,
        '50%': [10000000, 1000000],
        max: 100000000,
    },

    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderCost.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));

    cleaveCost.setRawValue(sliderValue);

    calcMortgage();
});

// Slider Downpayment
const sliderDownpayment = document.querySelector('#slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: 0,
        max: 10000000,
    },
 
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderDownpayment.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));

    cleaveDownPayment.setRawValue(sliderValue);

    calcMortgage();
});

// Slider years
const sliderTerm  = document.querySelector('#slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        min: 1,
        max: 30,
    },  

    format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
    }),
});

sliderTerm.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));

    cleaveTerm.setRawValue(sliderValue);

    calcMortgage();
}); 

// Formating inputCost
inputCost.addEventListener('input', function() {

    const value = +cleaveCost.getRawValue();

    // Updating range slider
    sliderCost.noUiSlider.set(value);

    // Maximum price check
    if (value > maxPrice) inputCost.closest('.param__details').classList.add('param__details--error');
    if (value <= maxPrice) inputCost.closest('.param__details').classList.remove('param__details--error');
    
    // value dependence downpayment in input cost
    const percentMin = value * 0.15,
          percentMax = value * 0.90;


    sliderDownpayment.noUiSlider.updateOptions({
        range: {
            min: percentMin,
            max: percentMax,
        },
    });


});

inputCost.addEventListener('change', function() {

    const value = +cleaveCost.getRawValue();

    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');
    }

    cleaveCost.setRawValue(maxPrice);

});