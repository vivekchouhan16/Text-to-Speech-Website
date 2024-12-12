document.addEventListener('DOMContentLoaded', (event) => {
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
  signUpForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (validateForm(signUpForm)) {
          const signUpData = {
              type: 'signup',
              Name: document.getElementById('signUpUsername').value,
              Email: document.getElementById('signUpEmail').value,
              Contact: document.getElementById('signUpContact').value,
              Password: document.getElementById('signUpPassword').value
          };

          try {
              const response = await fetch('https://script.google.com/macros/s/AKfycbwgDFA_8BG4nq1AwjSc1F8K2A_05U8RW54sqe8kHTul6kLJVWe6LMSmS3qSJnUcmu_n/exec', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(signUpData)
              });
              const result = await response.json();
              alert(result.message);
          } catch (error) {
              console.error('Error:', error);
          }
      } else {
          console.log('Sign Up form is invalid');
      }
  });

  // Login form submission
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (validateForm(loginForm)) {
          const loginData = {
              type: 'login',
              Email: document.getElementById('loginUsername').value,
              Password: document.getElementById('loginPassword').value
          };

          try {
              const response = await fetch('https://script.google.com/macros/s/AKfycbwgDFA_8BG4nq1AwjSc1F8K2A_05U8RW54sqe8kHTul6kLJVWe6LMSmS3qSJnUcmu_n/exec', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(loginData)
              });
              const result = await response.json();
              alert(result.message);
          } catch (error) {
              console.error('Error:', error);
          }
      } else {
          console.log('Login form is invalid');
      }
  });
});
