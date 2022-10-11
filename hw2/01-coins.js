/** Exercise 01 - Coins **/
const dollar = 1;
//mutipled with 100 for below
const quarter = 25;
const dime = 10;
const nickel = 5;

const calculateChange = (input) => {
  let currVal = input;
  //base condition
  if (currVal > 10) return `$${currVal} ==> Error: the number is too large`;

  //complete output result
  let output = '';
  //depends on single or multiple values
  let suffix = '';

  // dollar calculation
  let dollarCount = Math.floor(currVal);
  if (dollarCount !== 0) {
    suffix = dollarCount > 1 ? `dollars` : `dollar`;
    // concatanaing for output
    output = valueStr(dollarCount, suffix);
    // reducing the amount of dollar from currVal
    currVal -= reduceAmountBy(dollarCount, dollar);
  }

  // multiplying it with 100 because, all the 
  // calculations will now be done after the decimal points
  currVal *= 100;

  // quarter calculation
  let quarterCount = Math.floor(currVal / quarter);
  if (quarterCount !== 0) {
    output = checkforCommaAddition(output);
    suffix = quarterCount > 1 ? `quarters` : `quarter`;
    output += valueStr(quarterCount, suffix);
    currVal -= reduceAmountBy(quarterCount, quarter);
  }
  // dime calculation
  let dimeCount = Math.floor(currVal / dime);
  if (dimeCount !== 0) {
    output = checkforCommaAddition(output);
    suffix = dimeCount > 1 ? `dimes` : `dime`;
    output += valueStr(dimeCount, suffix);
    currVal -= reduceAmountBy(dimeCount, dime);
  }
  // nickel calculation
  let nickelCount = Math.floor(currVal / nickel);
  if (nickelCount !== 0) {
    output = checkforCommaAddition(output);
    suffix = nickelCount > 1 ? `nickels` : `nickel`;
    output += valueStr(nickelCount, suffix);
    currVal -= reduceAmountBy(nickelCount, nickel);
  }
  // penny calculation
  let penny = Math.floor(currVal);
  if (penny !== 0) {
    output = checkforCommaAddition(output);
    suffix = penny > 1 ? `pennies` : `penny`;
    output += valueStr(penny, suffix);
  }
  //final output
  return `$${input} ==> ${output}`;
};

function reduceAmountBy(count, currency) {
  return count * currency;
}

function valueStr(prefix, suffix) {
  return `${prefix} ${suffix}`;
}

function checkforCommaAddition(output) {
  if (output !== '')
    output += `, `;
  return output;
}

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 pennycl
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large



