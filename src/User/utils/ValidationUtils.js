export function validateUsername(username) {
   return username.trim() === ''
}

export function validatePassword(password) {
   return password.trim().length<8;
}

export function validateConfirmPassword(password,confirmPassword){
   return password!==confirmPassword && !validatePassword(password);
}

export function validateName(name){
   return name.trim() === '';
}