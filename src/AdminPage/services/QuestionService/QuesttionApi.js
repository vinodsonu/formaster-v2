import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../constants/APIConstants'
import endpoints from '../endpoints'

export default class QuestionApiService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }

   getCurrentFormDetails(formId) {
      const { questions } = endpoints
      const endpointData = `${questions[0]}${formId}${questions[1]}`
      return networkCallWithApisauce(this.api, endpointData, {}, apiMethods.get)
   }

   publishCurrentFormDetails(details) {
      const { updateQuestions } = endpoints
      const endpointData = `${updateQuestions[0]}${details.form_id}${updateQuestions[1]}`
      return networkCallWithApisauce(
         this.api,
         endpointData,
         { details },
         apiMethods.post
      )
   }
}
