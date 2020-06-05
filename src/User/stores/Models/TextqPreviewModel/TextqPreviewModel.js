import { observable } from 'mobx'

import QuestionModel from '../QuestionModel'

class TextqPreviewModel extends QuestionModel {
   @observable textResponseDetails
   constructor(question) {
      super(question)
      if(question.text_response_details)
         this.textResponseDetails = question.text_response_details.response_text
   }

   onChangeResponseText = updatedText => {
      
      this.textResponseDetails = updatedText
      
   }

   getRequestObject = () => {
      let result = {
         question_id: this.questionId,
         choice_response_details: null
      }
      if(this.textResponseDetails)
         result.text_response_details = {
            response_text: this.textResponseDetails
         }
      else
         result.text_response_details = null
      return result;
      
   }
}

export { TextqPreviewModel }
