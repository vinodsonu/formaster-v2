import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../constants/APIConstants'
import endpoints from '../endpoints'

export default class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }
   getUserProfile(accessToken) {
      return networkCallWithApisauce(
         this.api,
         endpoints.userProfile,
         {
            accessToken: accessToken
         },
         apiMethods.get
      )
   }
}
