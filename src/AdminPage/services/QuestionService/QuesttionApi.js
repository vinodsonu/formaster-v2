import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'
import {BASE_URL} from '../../../Common/constants/UrlConstants';

export default class QuestionApiService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   getCurrentFormDetails(formId) {
      const { questions } = endpoints
      const endpointData = `${questions[0]}${formId}${questions[1]}`
      return networkCallWithApisauce(
         this.api, 
         endpointData, 
         {}, 
         apiMethods.get)
   }

   publishCurrentFormDetails(details,formId) {
      const { updateQuestions } = endpoints
      const endpointData = `${updateQuestions[0]}${formId}${updateQuestions[1]}`
      return networkCallWithApisauce(
         this.api,
         endpointData,
          details ,
         apiMethods.post
      )
   }
}
