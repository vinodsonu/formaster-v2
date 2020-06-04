class BasicPreviewModel {
   constructor(question) {
      this.questionId = question.question_id
      this.questionType = question.question_type
      this.questionText = question.question_text
      this.required = question.required
      this.description = question.description
      this.imageUrl = question.image_url
   }

   getRequestObject = () => {
      return {
         question_id: this.questionId
      }
   }

   onSubmitQuestion = () => {}
}

export { BasicPreviewModel }
