import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../../services/endpoints'
import {BASE_URL} from '../../../Common/constants/UrlConstants';

export default class QuestionPreviewService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }
   getPreviewQuestion(formId, offset) {
      const endpoint = `${endpoints.userPreview[0]}${formId}${endpoints.userPreview[1]}?offset=${offset}`
      return networkCallWithApisauce(this.api, endpoint, {}, apiMethods.get)
   }

   submitQuestion(details,formId) {
      const endpoint = `${endpoints.questionSubmit[0]}${formId}${endpoints.questionSubmit[1]}v1/?question_id=${details.question_id}`
      return networkCallWithApisauce(
         this.api,
         endpoint,
          details ,
         apiMethods.post
      )
   }
}
