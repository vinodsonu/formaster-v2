import { observable, action } from 'mobx'
import {inject} from "mobx-react";

import {formStore} from '../../index.js';
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
      const {
         updateFormName
      }  = formStore;
      await updateFormName(this.formName);
   }
}

export { FormModel }
