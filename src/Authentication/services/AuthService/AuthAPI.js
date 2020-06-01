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
      return networkCallWithApisauce(
         this.api,
         endpoints.signIn,
         {
           authDetails
         },
         apiMethods.post
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
