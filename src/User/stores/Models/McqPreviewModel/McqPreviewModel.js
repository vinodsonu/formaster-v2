import { observable } from 'mobx'

import QuestionModel from '../QuestionModel'

class McqPreviewModel extends QuestionModel {
   @observable responseChoice
   constructor(question) {
      super(question)
      if(question.multiple_choice_question_details)
         this.choices = question.multiple_choice_question_details.choices
      if(question.choice_response_details)
         this.responseChoice = question.choice_response_details.response_choice
   }

   onChangeResponseChoice = updatedChoice => {
      this.responseChoice = updatedChoice
   }

   getRequestObject = () => {
      let result ={
         question_id: this.questionId,
         text_response_details: null
      }
      if(this.responseChoice)
         result.choice_response_details = {
            response_choice: this.responseChoice
         }
      else
      result.choice_response_details = null;
      return result;
   }
}

export { McqPreviewModel }
