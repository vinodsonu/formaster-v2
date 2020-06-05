import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'
import {BASE_URL} from '../../../Common/constants/UrlConstants';

export default class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
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
