import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FAILURE,
   API_SUCCESS,
   API_FETCHING
} from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import FormModel from '../Models/FormModel'

class FormsStore {
   @observable getFormsApiStatus
   @observable getFormApiError
   @observable getCreateFormApiStatus
   @observable getCreateFormApiError
   @observable getUpdateFormNameApiStatus
   @observable getUpdateFormNameApiError
   @observable getDeleteFormApiStatus
   @observable getDeleteFormApiError
   @observable forms

   constructor(formService, questionsStore) {
      this.formService = formService
      this.questionsStore = questionsStore
      this.init()
   }

   @action.bound
   init() {
      this.forms = new Map()
      this.getFormsApiStatus = API_INITIAL
      this.getFormApiError = null
      this.getCreateFormApiStatus = API_INITIAL
      this.getCreateFormApiError = null
      this.getUpdateFormNameApiStatus =API_INITIAL
      this.getUpdateFormNameApiError = null;
      this.getDeleteFormApiStatus = API_INITIAL;
      this.getDeleteFormApiError = null;
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
      response.forEach(form => {
         this.forms.set(form.form_id, new FormModel(form))
      })
   }

   @action.bound
   getUserForms() {
      const userFromsPromise = this.formService.getForms()
      return bindPromiseWithOnSuccess(userFromsPromise)
         .to(this.setGetFormApiStatus, this.setGetFromsApiResponse)
         .catch(this.setGetFormApiError)
   }

   @action.bound
   setGetCreateFormApiStatus(status) {
      this.getCreateFormApiStatus = status
   }

   @action.bound
   setGetCreateFormApiError(error) {
      this.getCreateFormApiError = error
   }

   @action.bound
   setCreateFormApiResponse(response) {
      this.forms.set(response.form_id, {
         formId: response.form_id,
         formName: response.form_name
      })
   }

   @action
   onCreateNewForm = formName => {
      const createNewFormPromise = this.formService.createNewForm(formName)
      return bindPromiseWithOnSuccess(createNewFormPromise)
         .to(this.setGetCreateFormApiStatus, this.setCreateFormApiResponse)
         .catch(this.setGetCreateFormApiError)
   }

   @action
   setGetUpdateFormNameApiStatus = status =>{
         this.getUpdateFormNameApiStatus = status;
   }

   @action
   setGetCreateFormApiError = error =>{
      this.getUpdateFormNameApiError = error;
   }

   

   @action
   updateFormName = form =>{
      const updateFormNamePromise = this.formService.updateFormName(form)
      return bindPromiseWithOnSuccess(updateFormNamePromise)
         .to(this.setGetUpdateFormNameApiStatus, ()=>{
            this.forms.set(form.form_id,new FormModel(form))
         })
         .catch(this.getUpdateFormNameApiError)
   }


   @action
   setGetDeleteFormApiError = error =>{
      this.getDeleteFormApiError =error;
   }

   @action
   setGetDeleteFormApiStatus = status=>{
      this.getDeleteFormApiStatus = status;
   }

   @action
   onDeleteForm = formId =>{
      const deleteFormPromise = this.formService.deleteForm(formId)
      return bindPromiseWithOnSuccess(deleteFormPromise)
         .to(this.setGetDeleteFormApiStatus, ()=>{
            this.forms.delete(formId);
         })
         .catch(this.setGetDeleteFormApiError)
      
   }
   

   @action
   getFormDetails = async formId => {
      await this.questionsStore.getTheCurrentFormDetails()
   }

   @computed
   get isCreatingNewForm() {
      return this.getCreateFormApiStatus === API_FETCHING
   }
}

export { FormsStore }
