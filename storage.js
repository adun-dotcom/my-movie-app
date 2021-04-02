const signUpUser = (param) => {
  if (!param.registerPwd || !param.registerEmail || !param.fullname) {
    return alert('Data required')
  } 
  let users = localStorage.getItem('users')
  users = JSON.parse(users)
  let data = {
    email: param.registerEmail,
    password: param.registerPwd,
  }
  if (!users){
    localStorage.setItem('users', JSON.stringify([param]))
     createUser(data)
     return 
  }
  let exist = users.find((user) => user.registerEmail === param.registerEmail)
  if (!exist) {
    users = [...users, param]
    localStorage.setItem('users', JSON.stringify(users))
    
    
    createUser(data)
  } else {
    alert('user already exists')
  }
}

// login storage
const createUser = (param) => {
  let users = JSON.parse(localStorage.getItem('users'))
  let exist = users.find(
    (user) =>
      user.registerEmail === param.email &&
       user.registerPwd === param.password
  )
  if (!exist) {
    
    alert('Email or password incorrect')
  } else {
    localStorage.setItem('userData', JSON.stringify(exist))
    window.location.href = 'home.html'
  }
}
const getUser = () => {
  let user = localStorage.getItem('userData')
  return user
}
const deleteUser = () => {
  localStorage.removeItem('userData')
}
