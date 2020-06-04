import { observable, action, computed } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, API_FAILURE, API_SUCCESS } from '@ib/api-constants'

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

class PreviewStore {
   @observable getPreviewQuestionsApitatus
   @observable getPreviewQuestionsApiError
   @observable getSubmitQuestionApiStatus
   @observable getSubmitQuestionApiError
   @observable question
   @observable totalQuestions
  

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
      console.log(response)
      this.totalQuestions = response.total_questions
      const {
         question,
         question: { question_type }
      } = response
      switch (question_type) {
         case MULTIPLE_CHOICE:
            this.question = new McqPreviewModel(question)
            break
         case WELCOME_SCREEN:
            this.question = new BasicPreviewModel(question)
            break
         case THANK_YOU_SCREEN:
            this.question = new BasicPreviewModel(question)
            break
         case SHORT_TEXT:
            this.question = new TextqPreviewModel(question)
            break
         case LONG_TEXT:
            this.question = new TextqPreviewModel(question)
            break
      }
   }

   @action.bound
   setGetPreviewQuestionsApitatus(status) {
      this.getPreviewQuestionsApitatus = status
   }

   @action.bound
   setGetPreviewQuestionsApiError(error) {
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
      this.getUserProfileAPIStatus = status
   }

   @action.bound
   setGetSubmitQuestionApiError = error => {
      this.getUserProfileAPIError = error
   }

   @action.bound
   setSubmitResponse = response => {}

   @action.bound
   submitQuestion() {
      const submitPromise = this.previewService.submitQuestion(
         this.question.getRequestObject()
      )
      return bindPromiseWithOnSuccess(submitPromise)
         .to(this.setGetSubmitQuestionApiStatus, this.setSubmitResponse)
         .catch(this.setGetSubmitQuestionApiError)
   }
}

export { PreviewStore }
