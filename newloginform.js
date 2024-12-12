document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');

    // Form validation function
    function validateForm(form) {
        let valid = true;
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return valid;
    }

    // Sign Up form submission
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(signUpForm)) {
            const signUpData = {
                Name: document.getElementById('signUpUsername').value,
                Email: document.getElementById('signUpEmail').value,
                Contact: document.getElementById('signUpContact').value,
                Password: document.getElementById('signUpPassword').value
            };
            console.log(signUpData);
            localStorage.setItem('signUpData', JSON.stringify(signUpData));

            // Save data to Google Sheet
            let url = signUpForm.action;
            let d = new FormData(signUpForm);
            
            fetch(url, {
                method: "POST",
                body: d
            }).then(response => response.json())
              .then(data => {
                  console.log(data);
                  if (data.result === "success") {
                      alert('Sign up successfully!');
                  } else {
                      alert('Failed to sign up. Please try again.');
                  }
              })
              .catch(error => {
                  console.log('Error:', error);
                  alert('Failed to sign up. Please try again.');
              });
        } else {
            console.log('Sign Up form is invalid');
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(loginForm)) {
            const loginData = {
                Email: document.getElementById('loginUsername').value,
                Password: document.getElementById('loginPassword').value
            };
            console.log(loginData);
            localStorage.setItem('loginData', JSON.stringify(loginData));

            // Validate login data with Google Sheet
            let url = loginForm.action;
            let d = new FormData(loginForm);

            fetch(url, {
                method: "POST",
                body: d
            }).then(response => response.json())
              .then(data => {
                  console.log(data);
                  if (data.result === "success") {
                      alert('Login successfully!');
                  } else {
                      alert('Incorrect email or password.');
                  }
              })
              .catch(error => {
                  console.log('Error:', error);
                  alert('Failed to login. Please try again.');
              });
        } else {
            console.log('Login form is invalid');
        }
    });
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const savedSignUpData = JSON.parse(localStorage.getItem('signUpData'));
const savedLoginData = JSON.parse(localStorage.getItem('loginData'));

console.log('Retrieved Sign Up Data:', savedSignUpData);
console.log('Retrieved Login Data:', savedLoginData);
