import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'
import {BASE_URL} from '../../../Common/constants/UrlConstants';

export default class FormApiService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   getForms(limit,offset) {
      return networkCallWithApisauce(
         this.api,
         `/user_forms/v1/?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
      }
   
}
