import getPreviewDetails from '../../fixtures/getPreviewDetails.json'

export default class QuestionPreviewService {
   getPreviewQuestion(formId, offset) {
      return new Promise((resolve, reject) => {
         resolve(getPreviewDetails[offset])
      })
   }
   submitQuestion(details,formId) {
      return new Promise((resolve, reject) => {
         resolve()
      })
   }
}
