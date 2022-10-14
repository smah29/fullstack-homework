/** Exercise 02 - Reverse **/

let main = document.getElementsByTagName('main')[0];
let button = document.getElementById('reverse');
button.addEventListener('click', reverseTheNumber);

function reverseTheNumber(event) {
    let output = document.getElementsByTagName('output')[0];
    if (output == null) {
        output = document.createElement('output');
        output.style.paddingTop = '15px'
        main.appendChild(output);
    }
    let input = document.getElementById('input').value;

    //removing leading zeros, ex 00000000
    input = input.replace(/^0+/, '');

    if (input.length !== 8) {
        output.textContent = `Error: Please input an 8-digit number`;
        output.style.color = 'red';
    } else {
        let reverse = 0;
        let currVal = input;
        let lastDigit;

        while (currVal != 0) {
            lastDigit = currVal % 10;
            reverse = reverse * 10 + lastDigit;
            currVal = Math.floor(currVal / 10);
        }
        output.textContent = `${input} --> ${reverse}`;
        output.style.color = 'green';
    }
    event.preventDefault();
}

