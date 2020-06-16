import { observable, action } from 'mobx'
import {
   API_INITIAL
} from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import FormModel from '../Models/FormModel'

class UserFormStore {
   @observable getFormsApiStatus
   @observable getFormApiError
   @observable forms
   @observable totalFormsCount

   constructor(formService) {
      this.formService = formService
      this.init()
   }

   @action.bound
   init() {
      this.forms = new Map()
      this.getFormsApiStatus = API_INITIAL
      this.getFormApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetFormApiStatus(status) {
     
      this.getFormsApiStatus = status
   }

   @action.bound
   setGetFormApiError(error) {
      this.getFormApiError = error
   }

   @action.bound
   setGetFromsApiResponse(response) {
      this.forms = new Map();
      this.totalFormsCount = response.total_count;
      response.forms.forEach(form => {
         this.forms.set(form.form_id, new FormModel(form))
      })
   }

   @action.bound
   getUserForms(limit,offset) {
      const userFromsPromise = this.formService.getForms(limit,offset)
      return bindPromiseWithOnSuccess(userFromsPromise)
         .to(this.setGetFormApiStatus, this.setGetFromsApiResponse)
         .catch(this.setGetFormApiError)
   }

}

export { UserFormStore }
