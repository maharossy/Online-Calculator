import { percentFormatter } from "./formatters.js";


console.log(percentFormatter.format(0.567)); 
// Program rates
const programBase = 0.12,
      programIt = 0.047,
      programGov = 0.067,
      programZero = 0.108;

// Show  program rates on page
document.querySelector('#base-value').value = programBase;
document.querySelector('#it-value').value = programIt;
document.querySelector('#gov-value').value = programGov;
document.querySelector('#zero-value').value = programZero;

// Show program rates in label
document.querySelector('#base-text').innerText = percentFormatter.format(programBase);
document.querySelector('#it-text').innerText = percentFormatter.format(programIt);
document.querySelector('#gov-text').innerText = percentFormatter.format(programGov);
document.querySelector('#zero-text').innerText = percentFormatter.format(programZero);

// Display of the selected interest rate
const programInputs = document.querySelectorAll('input[name="program"]'),
      totalPercent = document.querySelector('#total-percent');

programInputs.forEach((input) => {
    // display of the percent at the start
    if (input.checked) {
        totalPercent.innerText = percentFormatter.format(input.value);
    }

    input.addEventListener('click', function() {
        totalPercent.innerText = percentFormatter.format(this.value);
    });
});