import signInAPIResponse from '../../fixtures/signInAPIResponse.json'

export default class AuthFixtureService {
   getAuth(authDetails) {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(signInAPIResponse)
            // reject();
         }, 1000)
      })
   }
   
   onUserSignup(signUpDetails){
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            // reject();
            resolve()
         }, 2000)
      })
   }
   
   onUserSignOut(){
      return new Promise((resolve,reject)=>{
         resolve();
      })
   }
   
   
}
