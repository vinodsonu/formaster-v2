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
      response.forms.forEach(form => {
         this.forms.set(form.form_id, new FormModel(form))
      })
   }

   @action.bound
   getUserForms() {
       console.log(this.formService)
      const userFromsPromise = this.formService.getForms()
      return bindPromiseWithOnSuccess(userFromsPromise)
         .to(this.setGetFormApiStatus, this.setGetFromsApiResponse)
         .catch(this.setGetFormApiError)
   }

}

export { UserFormStore }
