import { observable } from 'mobx'

class ScreenTypeModel {
   @observable message
   @observable imageUrl
   constructor(question) {
      this.message = question.message
      this.imageUrl = question.image_url
   }

   getRequestObject = () => {
      return {
         message: this.message,
         image_url: this.imageUrl
      }
   }
}

export { ScreenTypeModel }
