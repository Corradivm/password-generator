// Buttons that increase/decrease the password's length
const buttons = document.querySelectorAll(".arr-btn");

function getConfiguration() {
  // Get the nodes lists
  const rangeControl = document.querySelectorAll(".controls #range");
  const optControls = document.querySelectorAll(".controls .options");
  // Pass the elements values to genPassword()
  const length = rangeControl[0].value;
  // Booleans definition
  const isUpCase = optControls[0].checked, isLoCase = optControls[1].checked;
  const isNums = optControls[2].checked, isSym = optControls[3].checked;
  genPassword(isUpCase, isLoCase, isNums, isSym, length);
}

function genPassword(isUpCase, isLoCase, isNums, isSym, length) {
  const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbols = ["&", "$", "?", "!", "@", "#", "*", "%"];
  const characters = [upperCase, upperCase, lowerCase, lowerCase, numbers, symbols];
  let password = "", passLength = length;
  // Defines if the set is desired
  let hasUpCase = isUpCase, hasLoCase = isLoCase, hasNumbers = isNums, hasSymbols = isSym;
  // Generates the password
  while(password.length < passLength) {
    // Defines which array to use
    const charSet = Math.floor(Math.random() * characters.length);
    // with array's length as a limit, choose a random index
    const limitIndex = characters[charSet].length, indexChar = Math.floor(Math.random() * limitIndex);
    // Checks if the set is desired
    if(
      (charSet === 0 || charSet === 1) && hasUpCase === false ||
      (charSet === 2 || charSet === 3) && hasLoCase === false ||
      charSet === 4 && hasNumbers === false ||
      charSet === 5 && hasSymbols === false
    ) { continue }
    password += characters[charSet][indexChar];
  }
  display(password);
}

function display(output) {
  const display = document.getElementsByClassName("display")[0];
  display.innerHTML = output;
}

function copyText() {
  const text = document.getElementsByClassName("display")[0].innerHTML;
  const button = document.getElementById("copy-button");

  if(text === "Password Generator") { return }

  navigator.clipboard.writeText(text); // Copy the text inside the text field

  button.innerHTML = "Copied!";
  setTimeout(() => button.innerHTML = "Copy", 2000);
}

// Displays the length chosen by the user
document.getElementById("range").addEventListener("change", () => {
  const rangeControl = document.getElementById("range");
  const display = document.getElementById("length-display");
  display.innerHTML = rangeControl.value;
});

// Increase/decrease password's length
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.getElementById("length-display");
    const rangeControl = document.querySelectorAll(".controls #range")[0];
    let innerValue = parseInt(display.innerHTML);
    
    // Changes the inner value according to the value of 'data-action'
    if(button.dataset.action === "increase") {
      if(innerValue === 35) return 
      innerValue++;
    } else { 
      if(innerValue === 5) return 
      innerValue--;
    }
    rangeControl.value = innerValue
    display.innerHTML = innerValue;
  })
});

document.getElementById("action-button").addEventListener("click", getConfiguration);