import { observable } from 'mobx'

import QuestionModel from '../QuestionModel'

class TextqPreviewModel extends QuestionModel {
   @observable responseChoice
   constructor(question) {
      super(question)
      this.textResponseDetails = question.text_response_details.response_text
   }

   onChangeResponseText = updatedText => {
      this.textResponseDetails = updatedText
   }

   getRequestObject = () => {
      return {
         question_id: this.questionId,
         text_response_details: {
            response_text: this.textResponseDetails
         },
         choice_response_details: null
      }
   }
}

export { TextqPreviewModel }
