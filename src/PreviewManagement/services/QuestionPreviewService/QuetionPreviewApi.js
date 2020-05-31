import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'

export default class QuestionPreviewService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }
   getPreviewQuestion(formId, offset) {
      const endpoint = `${endpoints.userPreview[0]}${formId}${endpoints.userPreview[1]}/questions/?limit=1&offset=${offset}`
      return networkCallWithApisauce(this.api, endpoint, {}, apiMethods.get)
   }

   submitQuestion(details) {
      const endpoint = `${endpoints.questionSubmit[0]}${details.question_id}${endpoints.questionSubmit[1]}`
      return networkCallWithApisauce(
         this.api,
         endpoint,
         { details },
         apiMethods.post
      )
   }
}
