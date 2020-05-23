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

function generateCharacterAllocation(passwordDetails){
  var dist = [0,0,0,0];
  var includeChars = [passwordDetails.includeUpperCase,
                      passwordDetails.includeLowerCase,
                      passwordDetails.includeNumbers,
                      passwordDetails.includeSpecialCase];
  var assigned = 0;
  var v = 0;
  for(index = 0; index < includeChars.length; index++){
    if(includeChars[index]){
      if(v == passwordDetails.selectedAttNum-1){
        dist[index] = (passwordDetails.passwordLength-assigned);
        assigned+=dist[index];
      } else {
        var max = ((passwordDetails.passwordLength-assigned) - (passwordDetails.selectedAttNum - ++v));
        dist[index] = Math.ceil(Math.random() * max);
        if(dist[index] == 0){
          dist[index] = 1;
        }
        assigned+=dist[index];
      }
    }
  }

  return dist;
}

function generatePassword(passwordDetails) {
  if(!passwordDetails.isValid()){
    return false;
  }
  var dist = generateCharacterAllocation(passwordDetails);

  var generated = "";
  for(var index = 0; generated.length < passwordDetails.passwordLength; index = (index + 1) % dist.length){
    if (dist[index] > 0){
      if(index == 0) {
        generated = generated + genRandom('A', 26);
      } else if (index == 1) {
        generated = generated + genRandom('a', 26);
      } else if (index == 2) {
        generated = generated + (Math.floor(Math.random()*10));
      } else {
        generated = generated + specialChars[(Math.floor(Math.random() * specialChars.length))];
      }
      dist[index]-=1;
    }
  }
  return generated;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

