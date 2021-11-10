// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

//**Homework coding begins below this line**

//Established messages (string variables) for the program prompts/confirmations to guide user to create password:
var confirm1 =
  "Please include AT LEAST ONE of the following in your password: Lowercase letters, uppercase letters, numeric values, and/or special characters.";
var selectChars = "These will be included in your password.";
var confirmLC = "Would you like to include lowercase letters?";
var confirmUC = "Would you like to include uppercase letters?";
var confirmNum = "Would you like to include numbers?";
var confirmSpec =
  "Would you like to include special characters (such as !, #, %, &, etc.; does not include spaces)?";

//Values confirming user selection for characters and password length
var pwLength;
var LC;
var UC;
var Num;
var Spec;
//This array will eventually combine the user character values to generate the password:
var pwArray = [];

//Possible character values user can select (as arrays)
var charLC = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var charUC = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var charNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var charSpec = [
  "!",
  "'",
  "#",
  '"',
  "$",
  "%",
  "&",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "^",
  "(",
  ")",
  "[",
  "]",
  "|",
];

/*Logic, including function, for actually generating the password using the above variables and arrays, 
AND resetting the password generator after a password has been produced:*/

function generatePassword() {
  //passwordArray defined locally to allow values to be re-established each time function is run
  passwordArray = [];
  while (true) {
    //Prompts for correct password length and accompanying error message if outside parameters
    pwLength = Number(
      prompt("Please enter a password length from 8 to 128 characters:")
    );
    if (pwLength < 8 || pwLength > 128) {
      alert("You must enter a valid number.");
      continue;
    } else {
      alert("Your password will be " + pwLength + " characters long.");
    }
    //Asks user to confirm that at least one character group must be included in password
    while (true) {
      if (!confirm(confirm1)) {
        continue;
      }
      //Offers option for password to include lowercase letters (with confirmation alert if selected)
      LC = confirm(confirmLC);
      if (LC) {
        pwArray = pwArray.concat(charLC);
        alert(selectChars);
      }
      //Offers option for password to include uppercase letters (with confirmation alert if selected)
      UC = confirm(confirmUC);
      if (UC) {
        pwArray = pwArray.concat(charUC);
        alert(selectChars);
      }
      //Offers option for password to include numeric values (with confirmation alert if selected)
      Num = confirm(confirmNum);
      if (Num) {
        pwArray = pwArray.concat(charNum);
        alert(selectChars);
      }
      //Offers option for password to include special characters (with confirmation alert if selected)
      Spec = confirm(confirmSpec);
      if (Spec) {
        pwArray = pwArray.concat(charSpec);
        alert(selectChars);
      }
      //Return to character selection if user selects none of the above four options
      if (!LC && !UC && !Num && !Spec) {
        continue;
      } else {
        break;
      }
    }
    //If password length is valid and at least one character is selected, password is generated using the following:
    /*Notes on the following methods: 
    Math.random = Completely random number generator
    Math.floor = Establishes opportunity to set parameters for "random"*/
    var password = [];
    for (var i = 0; i < pwLength; i++) {
      randomIndex = Math.floor(Math.random() * pwArray.length);
      password.push(pwArray[randomIndex]);
    }
    //Values are concatenated without spacing in between and loop ends:
    return password.join("");
  }
}

//**Homework coding ends here**

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
