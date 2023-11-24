"use strict";

const userForm = new UserForm() 

userForm.loginFormCallback = data => {
    ApiConnector.login(data, entrance => {
        entrance.success ? location.reload() : userForm.setLoginErrorMessage(entrance.error)
    })
}
userForm.registerFormCallback = data => {
    ApiConnector.register(data, entrance => {
        console.log(data)
        entrance.success ? location.reload() : userForm.setRegisterErrorMessage(entrance.error)
    })
}
