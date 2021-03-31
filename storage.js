const signUpUser = (param)=>{
  if(!param.registerPwd || !param.registerEmail || !param.firstname || !param.lastname){
    return alert('fill it my friend!')
  }else{
    window.location.href = '/#btn-signin'
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
   alert('user not registered')
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
