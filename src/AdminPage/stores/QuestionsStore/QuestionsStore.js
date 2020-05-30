import { observable, action, computed } from 'mobx'
import { API_INITIAL, API_FAILURE, API_SUCCESS } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {
   WELCOME_SCREEN,
   THANK_YOU_SCREEN,
   SHORT_TEXT,
   LONG_TEXT,
   MULTIPLE_CHOICE
} from '../../constants/QuestionTypeContants.js'

import QuestionModel from '../Models/QuestionModel'
import McqTypeModel from '../Models/McqTypeModel'

class QuestionsStore {
   @observable getFormDetailsApiStatus
   @observable getFormDetailsApiError
   @observable questions
   @observable currentFormId
   @observable currentQuestionPreview
   @observable form
   @observable getPublishStatus
   @observable getPublishError
   @observable publishedLink
   newQuestionCount

   constructor(questionService) {
      this.questionService = questionService
      this.init()
   }

   @action.bound
   init() {
      this.questions = new Map()
      this.getFormDetailsApiStatus = API_INITIAL
      this.getFormDetailsApiError = null
      this.currentFormId = null
      this.currentQuestionPreview = null
      this.newQuestionCount = -1
      this.form = {
         formId: '',
         formName: ''
      }
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetFormDetailsStatus(status) {
      this.getFormDetailsApiStatus = status
   }

   @action.bound
   setFormDetailsResponse(response) {
      this.form = {
         formId: response.form_id,
         formName: response.form_name
      }
      response.questions.map(each => {
         if (each.question_type !== MULTIPLE_CHOICE)
            this.questions.set(each.question_id, new QuestionModel(each))
         else this.questions.set(each.question_id, new McqTypeModel(each))
      })
   }

   @action.bound
   setGetFormDetailsError(error) {
      this.getFormDetailsApiError = error
   }

   @action.bound
   getTheCurrentFormDetails(formId) {
      const formDetailsPromise = this.questionService.getCurrentFormDetails(
         formId
      )
      return bindPromiseWithOnSuccess(formDetailsPromise)
         .to(this.setGetFormDetailsStatus, this.setFormDetailsResponse)
         .catch(this.setGetFormDetailsError)
   }

   setGetPublishStatus = status => {
      this.getPublishStatus = status
   }

   setGetPublishError = error => {
      this.getPublishError = error
   }

   setPublishResponse = response => {
      this.publishedLink = response
   }

   @action.bound
   onPublish = () => {
      const details = Array.from(this.questions.values()).map(each =>
         each.getRequestObject()
      )
      const formQuestionsPublishPromise = this.questionService.publishCurrentFormDetails(
         details
      )
      return bindPromiseWithOnSuccess(formQuestionsPublishPromise)
         .to(this.setGetPublishStatus, this.setPublishResponse)
         .catch(this.setGetPublishError)
   }

   @action.bound
   addNewQuestion = event => {
      switch (event.target.value) {
         case MULTIPLE_CHOICE:
            this.questions.set(
               this.newQuestionCount,
               new McqTypeModel({
                  question_id: this.newQuestionCount--,
                  question_type: event.target.value,
                  description: '',
                  question_text: '',
                  image_url: '',
                  required: true,
                  multiple_choice_question_details: {
                     choices: []
                  }
               })
            )
            break
         default:
            this.questions.set(
               this.newQuestionCount,
               new QuestionModel({
                  question_id: this.newQuestionCount--,
                  question_type: event.target.value,
                  description: '',
                  question_text: '',
                  image_url: '',
                  required: true,
                  multiple_choice_question_details: null
               })
            )
      }
   }
}

export { QuestionsStore }
