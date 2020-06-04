import { observable } from 'mobx'

class QuestionModel {
   @observable questionType
   @observable description
   @observable questionText
   @observable imageUrl
   @observable required

   constructor(question) {
      this.questionId = question.question_id
      this.questionType = question.question_type
      this.description = question.description
      this.questionText = question.question_text
      this.imageUrl = question.image_url
      this.required = question.required
   }

   getRequestObject = () => {
      return {
         question_id: this.questionId,
         question_type: this.questionType,
         description: this.description,
         question_text: this.questionText,
         image_url: this.imageUrl,
         required: this.required,
         multiple_choice_question_details: null
      }
   }

   onChangeQuestionText = text => {
      this.questionText = text
   }

   onToggleRequired = () => {
      this.required = !this.required
   }

   onChangeDescription = des => {
      this.description = des
   }
}

export { QuestionModel }
