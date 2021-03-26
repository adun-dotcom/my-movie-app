const login = document.querySelector('.submit')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-password')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// button validation
login.addEventListener('click', event=>{
    event.preventDefault()
    valid()
})

function valid(){
    if (email.value.match(emailRegex) && password.value.length >= 6) {
      document.location.href = 'home.html'
    }
}

//function to validate email
function validEmail(){
   if (email.value.match(emailRegex)) {
       errorEmail.textContent = 'Valid email address! 😁'
       errorEmail.style.color = 'green'
     return true
   } else {
     errorEmail.textContent = 'Invalid email address! 🙂'
      errorEmail.style.color = 'red'
     return false
   }
}

email.addEventListener('keyup', validEmail)

// function to validate password
function validPassword() {
    
  if (password.value.length >= 1 && password.value.length <= 6) {
    errorPassword.textContent = 'Wrong Password! 🙂'
    errorPassword.style.color = 'red'
    return false
  } else {
    errorPassword.textContent = ' Password correct 😁'
    errorPassword.style.color = 'green'
    return true
  }
}

password.addEventListener('keyup', validPassword)

// show or hide password
function passwordReveal(){
    const iconUnlock = document.querySelector('.fa-unlock')
     const iconLock = document.querySelector('.fa-lock')
    if(password.type === 'password'){
        password.type = 'text'
       iconLock.classList.remove('hidden')
        iconUnlock.classList.add('hidden')
    }
    else{
        password.type = 'password'
        iconLock.classList.add('hidden')
        iconUnlock.classList.remove('hidden')
    }
}