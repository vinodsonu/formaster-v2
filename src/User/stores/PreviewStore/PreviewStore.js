import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import {
   WELCOME_SCREEN,
   THANK_YOU_SCREEN,
   SHORT_TEXT,
   LONG_TEXT,
   MULTIPLE_CHOICE
} from '../../constants/QuestionTypeContants.js'


import McqPreviewModel from '../Models/McqPreviewModel'
import TextqPreviewModel from '../Models/TextqPreviewModel'
import BasicPreviewModel from '../Models/BasicPreviewModel'
import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';


class PreviewStore {
   @observable getPreviewQuestionsApitatus
   @observable getPreviewQuestionsApiError
   @observable getSubmitQuestionApiStatus
   @observable getSubmitQuestionApiError
   @observable question
   @observable totalQuestions
   @observable totalAnswerableQuestions
  

   constructor(previewService) {
      this.previewService = previewService
      this.init()
   }

   @action.bound
   init() {
      this.getPreviewQuestionsApitatus = API_INITIAL
      this.getPreviewQuestionsApiError = null
      this.getSubmitQuestionApiStatus = API_INITIAL
      this.getSubmitQuestionApiError = null
      this.question = {}
   }

   @action.bound
   clearStore() {
      this.init()
   }


   @action.bound
   setPreviewQuestionResponse(response) {
      console.log("previewQuestion",response.total_questions)
      console.log(response.question.question_type)
      this.totalAnswerableQuestions = response.answerable_questions;
      this.totalQuestions = response.total_questions;
      const {
         question:newQuestion,
         question: { question_type }
      } = response;
      
      switch (question_type) {
         case MULTIPLE_CHOICE:
            this.question = new McqPreviewModel(newQuestion)
            break
         case WELCOME_SCREEN:
            this.question = new BasicPreviewModel(newQuestion)
            break
         case THANK_YOU_SCREEN:
            this.question = new BasicPreviewModel(newQuestion)
            break
         case SHORT_TEXT:
            
            this.question = new TextqPreviewModel(newQuestion)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            break
         case LONG_TEXT:
            this.question = new TextqPreviewModel(newQuestion)
            break
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
   }                                       

   @action.bound
   setGetPreviewQuestionsApitatus(status) {
      this.getPreviewQuestionsApitatus = status
   }

   @action.bound
   setGetPreviewQuestionsApiError(error) {
      console.log(error)
      this.getPreviewQuestionsApiError = error
   }

   @action.bound
   userPreview(formId, offset) {
      const userPreviewPromise = this.previewService.getPreviewQuestion(
         formId,
         offset
      )
      return bindPromiseWithOnSuccess(userPreviewPromise)
         .to(
            this.setGetPreviewQuestionsApitatus,
            this.setPreviewQuestionResponse
         )
         .catch(this.setGetPreviewQuestionsApiError)
   }

   @action.bound
   setGetSubmitQuestionApiStatus = status => {
      this.getSubmitQuestionApiStatus = status
   }

   @action.bound
   setGetSubmitQuestionApiError = e => {
      this.getSubmitQuestionApiError = e

      error(getUserDisplayableErrorMessage(e));
      console.log("submit error",e);

   }

   @action.bound
   setSubmitResponse = response => {
      success("successfully submittes")
   }

   @action.bound
   submitQuestion(formId) {
      const submitPromise = this.previewService.submitQuestion(
         this.question.getRequestObject(),formId
      )
      return bindPromiseWithOnSuccess(submitPromise)
         .to(this.setGetSubmitQuestionApiStatus, this.setSubmitResponse)
         .catch(this.setGetSubmitQuestionApiError)
   }
}

export { PreviewStore }
