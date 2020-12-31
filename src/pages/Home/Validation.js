export function registrationFormValidation(user){
    if(user?.name.trim() === "" || user?.name === null)
        return "Name cannot be empty.";
    if(user?.surname.trim() === "" || user?.surname === null)
        return "Surname cannot be empty.";
    if(user?.email.trim() === "" || user?.email === null)
        return "Email cannot be empty.";
    if(!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(user?.email))
        return "Email is not valid."
    if(user?.password.trim() === "" || user?.password === null)
        return "Password cannot be empty.";
    if(user?.rePassword.trim() === "" || user?.rePassword === null)
        return "Repeat password cannot be empty.";
    if(user?.password !== user?.rePassword)
        return "Repeat password and password don't match.";
    return "";
}

export function loginFormValidation(user){
    if(user?.email.trim() === "" || user?.email === null)
        return "Email cannot be empty.";
    if(!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(user?.email))
        return "Email is not valid."
    if(user?.password.trim() === "" || user?.password === null)
        return "Password cannot be empty.";
    return "";
}