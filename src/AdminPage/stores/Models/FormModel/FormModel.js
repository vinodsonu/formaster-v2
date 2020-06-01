import { observable, action } from 'mobx'

class FormModel {
   @observable formName
   constructor(form) {
      this.formId = form.form_id
      this.formName = form.form_name
   }

   getRequestObject = () => {
      return {
         form_id: this.formId,
         form_name: this.formName
      }
   }

   @action.bound
   onChangeFormName(formName) {
      this.formName = formName
   }
   
   @action
   onUpdateFormName = async() =>{
      alert("onUpdateFormName");
   }
}

export { FormModel }
