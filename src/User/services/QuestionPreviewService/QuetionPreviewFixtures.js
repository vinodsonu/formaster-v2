import getPreviewDetails from '../../fixtures/getPreviewDetails.json'

export default class QuestionPreviewService {
   getPreviewQuestion(formId, offset) {
      return new Promise((resolve, reject) => {
         resolve(getPreviewDetails[offset])
      })
   }
}
