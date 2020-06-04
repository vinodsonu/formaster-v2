import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'

export default class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }
   getAuth(authDetails) {
      
      const authValues =JSON.stringify(authDetails)
      console.log(authValues);
      // fetch('https://41f435608927.ngrok.io/api/formaster/login/v1/', {
      //       method: 'post',
      //       body: JSON.stringify(authDetails)
      //    }).then(function(response) {
      //       alert(response);
      //    }).catch((e)=>{
      //       alert("error")
      //    })
      return networkCallWithApisauce(
         this.api,
         'v1/signin/',
         {},
         apiMethods.get
      )
   }
   
   onUserSignup(signUpDetails){
      return networkCallWithApisauce(
         this.api,
         endpoints.signUp,
         {
           signUpDetails
         },
         apiMethods.post
      )
   }
}
