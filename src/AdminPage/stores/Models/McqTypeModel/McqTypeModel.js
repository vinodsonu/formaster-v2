import { observable } from 'mobx'
import QuestionModel from '../QuestionModel'

class McqTypeModel extends QuestionModel {
   @observable multipleChoiceQuestionDetails
   @observable choices
   constructor(question) {
      super(question)
      this.choices = question.multiple_choice_question_details.choices
   }

   getRequestObject = () => {
      return {
         question_id: this.questionId,
         question_type: this.questionType,
         description: this.description,
         question_text: this.questionText,
         image_url: this.imageUrl,
         required: this.required,
         multiple_choice_question_details: {
            choices: this.choices
         }
      }
   }

   onChangeChoices = choices => {
      this.choices = choices
   }
}

export { McqTypeModel }
