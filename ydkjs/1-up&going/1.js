
/* Exercise from
 https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch1.md
 - Write a program to calculate the total price of your phone purchase.
 You will- keep purchasing phones (hint: loop!)
 until you run out of money in your bank account.
 You'll also buy accessories for each phone as long as
 your purchase amount is below your mental spending threshold.
 - After you've calculated your purchase amount, add in the tax,
 then print out the calculated purchase amount, properly formatted.
 - Finally, check the amount against your bank account balance
    to see if you can afford it or not.
 You should set up some constants for the "tax rate,"
 "phone price," "accessory price," and "spending threshold,"
 as well as a variable for your "bank account balance.""
 You should define functions for calculating the tax
 and for formatting the price with a "$"
 and rounding to two decimal places.
 Bonus Challenge: Try to incorporate input into this program, perhaps with the prompt(..)
 covered in "Input" earlier. You may prompt the user for their bank account balance,
 for example.
 Have fun and be creative!
 */


const TAX_RATE = 0.2; // 20% VAT
let phonePrice = 600;
let accessoryPrice = 20;
let bankAccountBalance = 0;
let spendingBudget = 0;


let setBalances = function setBalance() {
  bankAccountBalance = prompt('How much money are in the bank account?');
  spendingBudget = prompt('What % of your budget do you want to allocate to phone purchases?');
  spendingBudget *= bankAccountBalance;
};

let priceAfterTax = function setPriceAfterTax(p) {
  return p * (1 + TAX_RATE);
};

let setPrice = function doSetPrice(p) {
  p *= (1 + Math.random());
  p = p.toFixed(2);
  return p;
};

let formatMoney = function formatMoneyAmount(amt) {
  return `$${amt.toFixed(2)}`;
};

let goshopping = function doPurchases() {
  while (spendingBudget > 0) {
      // buy phone

      console.log(`Budget: ${spendingBudget}`);

      if (spendingBudget > phonePrice ) {
        console.log(`I'll buy that phone for ${phonePrice}`);
        bankAccountBalance = bankAccountBalance - priceAfterTax(phonePrice);
        spendingBudget -= priceAfterTax(phonePrice);
      }


    console.log(`Money in budget: ${formatMoney(spendingBudget)}`);

      // buy accessory
    if (spendingBudget >= accessoryPrice) {
        console.log(`I'll also buy an accessory for ${formatMoney(accessoryPrice)}`);
        spendingBudget -= priceAfterTax(accessoryPrice);
        bankAccountBalance -= priceAfterTax(accessoryPrice);
    }

    // set new prices
    phonePrice = setPrice(phonePrice);
    accessoryPrice = setPrice(accessoryPrice);

    console.log(`New on offer: a phone for ${formatMoney(phonePrice)} and an accessory for ${formatMoney(accessoryPrice)}`);

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.log(`Now bank account balance is: ${formatMoney(bankAccountBalance)}`);
    console.log(`Now spending budget balance is: ${formatMoney(spendingBudget)}`);
  }

};

setBalances();
goshopping();

