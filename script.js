// Assignment Code
var modalButton = document.querySelector("#modelButton");
var passwordLengthField = document.querySelector("#passLength");
var upperCaseCheckbox = document.querySelector("#uppercase-check");
var lowerCaseCheckbox = document.querySelector("#lowercase-check");
var numbersCheckbox = document.querySelector("#numbers-check");
var specialCaseCheckbox = document.querySelector("#specchars-check");

var specialChars = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.',
                    '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{',
                    '|','}','~'];

function getPasswordDetails(){
  return {
    "passwordLength": parseInt(passwordLengthField.value),
    "includeUpperCase": upperCaseCheckbox.checked,
    "includeLowerCase": lowerCaseCheckbox.checked,
    "includeSpecialCase": specialCaseCheckbox.checked,
    "includeNumbers": numbersCheckbox.checked,
    "selectedAttNum": 0,
    "isValid": function(){
      if (this.passwordLength < 8){
        alert("Password cannot be less than 8 characters long!");
        return false;
      } else if (this.passwordLength > 128) {
        alert("Password cannot be more than 128 characters long!");
        return false;
      }

      if(this.includeUpperCase) {
        this.selectedAttNum++;
      }

      if(this.includeLowerCase) {
        this.selectedAttNum++;
      }

      if(this.includeSpecialCase) {
        this.selectedAttNum++;
      }

      if(this.includeNumbers) {
        this.selectedAttNum++;
      }

      if(this.selectedAttNum == 0){
        alert("At least one checkbox must be checked!")
        return false;
      }

      return true;
    }
  }
}

function genRandom(start, range){
  var inc = Math.floor(Math.random() * range);
  return String.fromCharCode(start.charCodeAt(0) + inc);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

