const login = document.querySelector('.submit')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-password')
const username = document.querySelector('.username')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// button validation
login.addEventListener('click', (event) => {
  event.preventDefault()
  
  let formData = {
    username: username.value,
    email: email.value,
    password: password.value
  }
  localStorage.setItem('formData', JSON.stringify(formData))
  console.log(localStorage.getItem('formData'))
})

// const userText = document.querySelector('.username-value')
// var storeUser; 
// username.addEventListener('input', letter=>{
//   storeUser = letter.target.value
//   localStorage.setItem('username', storeUser)
// })
// var storeEmail
// email.addEventListener('input', (letter) => {
//   storeEmail = letter.target.value
//   localStorage.setItem('email', storeEmail)
// })


// const storeStorage = ()=>{
//   localStorage.setItem('userUsername', email.value)
// }

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
  if (password.value.length === 0) {
    errorPassword.textContent = 'Please input password'
  } else if (password.value.length >= 1 && password.value.length <= 6) {
    errorPassword.textContent = 'Wrong Password! 🙂'
    errorPassword.style.color = 'red'
    login.disabled = true
    return false
  } else {
    errorPassword.textContent = ' Password correct 😁'
    errorPassword.style.color = 'green'
    login.disabled = false
    return true
  }
}

password.addEventListener('keyup', validPassword)

// show or hide password
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
