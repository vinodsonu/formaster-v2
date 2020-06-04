import { observable } from 'mobx'

import QuestionModel from '../QuestionModel'

class McqPreviewModel extends QuestionModel {
   @observable responseChoice
   constructor(question) {
      super(question)
      this.choices = question.multiple_choice_question_details.choices
      this.responseChoice = question.choice_response_details.response_choice
   }

   onChangeResponseChoice = updatedChoice => {
      this.responseChoice = updatedChoice
   }

   getRequestObject = () => {
      return {
         question_id: this.questionId,
         text_response_details: null,
         choice_response_details: {
            response_choice: this.responseChoice
         }
      }
   }
}

export { McqPreviewModel }
