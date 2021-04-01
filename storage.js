
const signUpUser = (param)=>{
  if(!param.registerPwd || !param.registerEmail || !param.fullname ){
    return alert('Data required')
  }else{
    signIn.style.left = '0'
    signUp.style.left = '100%'
    linkBtn.style.left = '0'
  }
  
  let users = localStorage.getItem('users')
   users = JSON.parse(users)
  if(!users) return localStorage.setItem('users', JSON.stringify([param]))
   let exist = users.find((user) => user.registerEmail === param.registerEmail)
     if (!exist) {
         users = [...users, param]
         localStorage.setItem('users', JSON.stringify(users))
     } else {
        alert('user already exists')
     }
}

const createUser = (param)=>{
 let users = JSON.parse(localStorage.getItem('users'))
 let exist = users.find(user=>user.registerEmail === param.email && user.registerPwd === param.password)
 if(!exist){
   alert('Email or password incorrect')
 } else{
   localStorage.setItem('userData', JSON.stringify(exist))
   window.location.href = 'home.html'
 }
}

const getUser = ()=>{
  let user = localStorage.getItem('userData')
  return user
}

const deleteUser = ()=>{
  localStorage.removeItem('formData')
}
