import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'

export default class FormApiService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }

   getForms() {
      return networkCallWithApisauce(
         this.api,
         endpoints.forms,
         {},
         apiMethods.get
      )
      }
   
}
