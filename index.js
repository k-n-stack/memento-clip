// const electron = require('electron');
// const net = electron.net;

let _showPassword = false;
let _email = '';
let _password = '';

const passwordInput = document.querySelector('.password-input');
const emailInput = document.querySelector('.email-input');
const togglePassword = document.querySelector('.password-toggle');
const submitButton = document.querySelector('.submit-button');

passwordInput.addEventListener('input', function (event) {
  _password = event.target.value;
});

emailInput.addEventListener('input', function (event) {
  _email = event.target.value;
});

togglePassword.addEventListener('click', function (event) {
  _showPassword = !_showPassword;
  togglePassword.innerHTML = _showPassword ? "Hide password" : "Show password";
  passwordInput.setAttribute('type', _showPassword ? "text" : "password");
});


submitButton.addEventListener('click', function (event) {
  window.test.login();
});
