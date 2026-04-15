function generateCard() {
  let cardTypes = ["VISA", "MASTERCARD"];
  let type = cardTypes[Math.floor(Math.random() * cardTypes.length)];

  let prefix = type === "VISA" ? "4" : "5";

  let cardNumber = generateLuhnNumber(prefix, 16);

  let expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  let expiryYear = String(new Date().getFullYear() + Math.floor(Math.random() * 5)).slice(-2);

  let cvv = Math.floor(100 + Math.random() * 900);

  document.getElementById("cardType").innerText = type;
  document.getElementById("cardNumber").innerText = formatCardNumber(cardNumber);
  document.getElementById("expiry").innerText = expiryMonth + "/" + expiryYear;
  document.getElementById("cvv").innerText = cvv;
}

// Format number XXXX XXXX XXXX XXXX
function formatCardNumber(number) {
  return number.replace(/(.{4})/g, "$1 ").trim();
}

// Generate number using Luhn Algorithm
function generateLuhnNumber(prefix, length) {
  let number = prefix;

  while (number.length < (length - 1)) {
    number += Math.floor(Math.random() * 10);
  }

  let sum = 0;
  let reverse = number.split("").reverse();

  for (let i = 0; i < reverse.length; i++) {
    let digit = parseInt(reverse[i]);

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
  }

  let checkDigit = (10 - (sum % 10)) % 10;

  return number + checkDigit;
}
