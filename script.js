// Assignment Code
var modalButton = document.querySelector("#modelButton");
var passwordLengthField = document.querySelector("#passLength");
var upperCaseCheckbox = document.querySelector("#uppercase-check");
var lowerCaseCheckbox = document.querySelector("#lowercase-check");
var numbersCheckbox = document.querySelector("#numbers-check");
var specialCaseCheckbox = document.querySelector("#specchars-check");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

