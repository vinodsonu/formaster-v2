import questionsResponse from '../../fixtures/getFromQuestions.json'

export default class QuestionFixtureService {
   getCurrentFormDetails() {
      return new Promise((resolve, reject) => {
         resolve(questionsResponse)
      })
   }

   publishCurrentFormDetails(details) {
      return new Promise((resolve, reject) => {
         resolve('')
      })
   }
}
