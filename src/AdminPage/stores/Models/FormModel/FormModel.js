import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FAILURE,
   API_SUCCESS,
   API_FETCHING
} from '@ib/api-constants'

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
   onUpdateFormName = async(updateFormName) =>{
      
      
      await formStore.updateFormName({
         form_id:this.formId,
         form_name:updateFormName
      });
   }
}

export { FormModel }
