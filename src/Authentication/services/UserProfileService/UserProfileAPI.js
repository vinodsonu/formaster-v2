import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'

export default class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://virtserver.swaggerhub.com/Form_Star/Formaster/1.0.0'
      })
   }
   getUserProfile() {
      return networkCallWithApisauce(
         this.api,
         endpoints.userProfile,
         {},
         apiMethods.get
      )
   }
}
