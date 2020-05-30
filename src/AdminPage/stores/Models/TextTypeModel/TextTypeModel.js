import { observable } from 'mobx'
class TextTypeModel {
   @observable QuestionText
   @observable required
   @observable description

   constructor(textQuestion) {
      this.questionText = textQuestion.question_text
      this.required = textQuestion.required
      this.description = textQuestion.description
   }

   getRequestObject = () => {
      return {
         question_text: this.questionText,
         required: this.required,
         description: this.description
      }
   }
}

export { TextTypeModel }
