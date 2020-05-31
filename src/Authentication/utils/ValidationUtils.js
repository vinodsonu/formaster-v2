export function validateUsername(username) {
   return username.trim() === ''
}

export function validatePassword(password) {
   return password.trim().length<8;
}
