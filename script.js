const login = document.querySelector('#btn-signin')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const errorEmail = document.querySelector('.error-email')
const firstname = document.querySelector('.firstname')
const lastname = document.querySelector('.lastname')
const errorPassword = document.querySelector('.error-password')
const username = document.querySelector('.username')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// localstorage function

// button validation
login.addEventListener('click', (event) => {
  event.preventDefault()
  let formDataSignIn = {
    email: email.value,
    password: password.value
  }
   createUser(formDataSignIn)
  
})


function valid() {
  if (email.value.match(emailRegex) && password.value.length >= 6) {
    document.location.href = 'home.html'
    email.value = ''
    username.value = ''
  }
}

//function to validate email
function validEmail() {
  if (email.value.match(emailRegex)) {
    errorEmail.textContent = 'Valid email address! 😁'
    errorEmail.style.color = 'green'
    login.disabled = false
    return true
  } else {
    errorEmail.textContent = 'Invalid email address! 🙂'
    errorEmail.style.color = 'red'
    login.disabled = true
    return false
  }
}

email.addEventListener('keyup', validEmail)

// function to validate password
function validPassword() {
  if (registerPwd.value.length === 0) {
    errorPassword.textContent = 'Please input password'
  } else if (registerPwd.value.length >= 1 && registerPwd.value.length <= 6) {
    errorPassword.textContent = 'Wrong Password! 🙂'
    errorPassword.style.color = 'red'
    register.disabled = true
    return false
  } else {
    errorPassword.textContent = ' Password correct 😁'
    errorPassword.style.color = 'green'
    register.disabled = false
    return true
  }
}

password.addEventListener('keyup', validPassword)

// show or hide password for sign in
function passwordReveal() {
  const iconUnlock = document.querySelector('.fa-unlock')
  const iconLock = document.querySelector('.fa-lock')
  if (password.type === 'password') {
    password.type = 'text'
    iconLock.classList.remove('hidden')
    iconUnlock.classList.add('hidden')
  } else {
    password.type = 'password'
    iconLock.classList.add('hidden')
    iconUnlock.classList.remove('hidden')
  }
}

// show or hide password for sign up
function revealSignup() {
  // const iconUnlock = document.querySelector('.fa-unlock')
  const iconSignup = document.querySelector('#icon-sign-up')
  const pwd = document.querySelector('.passwordSignup')
  if (pwd.type === 'password') {
    pwd.type = 'text'
    iconSignup.classList.add('fa-unlock')
      iconSignup.classList.remove('fa-lock')
  } else {
    pwd.type = 'password'
    iconSignup.classList.remove('fa-unlock')
    iconSignup.classList.add('fa-lock')
  }
}


// function to show sign in or sign up
const signIn = document.querySelector('#sign-in')
const signUp = document.querySelector('#sign-up')
const linkBtn = document.querySelector('#btn')

function createAcct() {
  signIn.style.left = '-100%'
  signUp.style.left = '0'
  linkBtn.style.left = '50%'
}

function enterAcct() {
  signIn.style.left = '0'
  signUp.style.left = '100%'
  linkBtn.style.left = '0'
}


// SIGN UP FUNCTIONS
const registerEmail = document.querySelector('#email-register')
const registerPwd = document.querySelector('#pwd-sign-up')
const register = document.querySelector('#btn-signup')
register.addEventListener('click', (event) => {
  event.preventDefault()
  let formDataSignup = {
    firstname: firstname.value,
    lastname: lastname.value,
    registerEmail: registerEmail.value,
    registerPwd: registerPwd.value,
  }
  signUpUser(formDataSignup)

})