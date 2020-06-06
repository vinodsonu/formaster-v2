import { observable, action,computed } from 'mobx'
import { API_INITIAL,API_FETCHING} from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {
   MULTIPLE_CHOICE, WELCOME_SCREEN, THANK_YOU_SCREEN,SHORT_TEXT,LONG_TEXT
} from '../../constants/QuestionTypeContants.js'

import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';


import QuestionModel from '../Models/QuestionModel'
import McqTypeModel from '../Models/McqTypeModel'
import McqPreviewModel from '../../../User/stores/Models/McqPreviewModel'
import TextqPreviewModel from '../../../User/stores/Models/TextqPreviewModel'

class QuestionsStore {
   @observable getFormDetailsApiStatus
   @observable getFormDetailsApiError
   @observable questions
   @observable currentFormId
   @observable currentQuestionPreview
   @observable form
   @observable getPublishStatus
   @observable getPublishError
   @observable getDeleteQuestionApiStatus
   @observable getDeleteQuestionError
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
      this.currentQuestionPreview = {}
      this.newQuestionCount = -1
      this.getDeleteQuestionApiStatus = API_INITIAL
      this.getDeleteQuestionError = null
      this.getPublishStatus = API_INITIAL;
      this.getPublishError = null;
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
   setGetDeleteQuestionApiStatus(status){
      this.getDeleteQuestionApiStatus = status;
   }

   @action.bound
   setGetDeleteQuestionError(e){
      this.getDeleteQuestionError = e;
      error(getUserDisplayableErrorMessage(e))
   }

   @action.bound
   onDeleteQuestion(questionId){
      if(questionId<0){
         this.questions.delete(questionId)
         return true;
      }
      const questionDeletePromise = this.questionService.onDeleteQuestion(questionId)
      return bindPromiseWithOnSuccess(questionDeletePromise)
         .to(this.setGetDeleteQuestionApiStatus,()=>{
            this.questions.delete(questionId)
         })
         .catch(this.setGetDeleteQuestionError)
   }

   @action.bound
   setGetFormDetailsStatus(status) {
      this.getFormDetailsApiStatus = status
   }

   @action.bound
   setFormDetailsResponse(response) {
      this.questions.clear();
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

   setGetPublishError = e => {
      this.getPublishError = e;
      error(getUserDisplayableErrorMessage(e));
   }
   @action
   setPublishResponse = async(response) => {
      success()
      this.publishedLink = response
      const {formId} = this.form;
      await this.getTheCurrentFormDetails(formId);
   }

   @action
   onPublish = () => {
      let posi =1;
     
      let details = Array.from(this.questions.values()).map(each =>
         each.getRequestObject()
      )

      

      let thankYouScreens = [];
      let welcomeScreens = [];

      details.forEach(each=>{
         if(each.question_type===WELCOME_SCREEN)
            welcomeScreens.push(each);
         else if(each.question_type===THANK_YOU_SCREEN)
            thankYouScreens.push(each)
      })

      let filteredQuestionDetails  =  details.filter(each=>each.question_type!==WELCOME_SCREEN&&each.question_type!==THANK_YOU_SCREEN);
      
      const screen = new QuestionModel({
         question_id: this.newQuestionCount--,
         question_type: '',
         description: '',
         question_text: '',
         image_url: '',
         required: false,
         multiple_choice_question_details: null
      })
      
      if(welcomeScreens.length===0) 
      {   
         screen.questionType=WELCOME_SCREEN;
         screen.questionText="Welcome";
         welcomeScreens.push(screen.getRequestObject());
      }
      if(thankYouScreens.length===0)
      {
         screen.questionType=THANK_YOU_SCREEN;
         screen.questionText="Thank You";
         thankYouScreens.push(screen.getRequestObject())
      }

      details = welcomeScreens.concat(filteredQuestionDetails).concat(thankYouScreens)
      details.forEach(each=>{
         each.position = posi++;
      })
      const {formId} = this.form;
      const formQuestionsPublishPromise = this.questionService.publishCurrentFormDetails(
         details,
         formId
      )
      return bindPromiseWithOnSuccess(formQuestionsPublishPromise)
         .to(this.setGetPublishStatus, this.setPublishResponse)
         .catch(this.setGetPublishError)
   }

   
   onClickQuestion = (questionId) =>{
      if(this.questions.get(questionId)!==undefined)
         this.setCurrentPreviewQuestion(this.questions.get(questionId).getRequestObject());
   }

   getNextQuestion = () =>{
      const presentQuestionIndex= Array.from(this.questions.keys()).findIndex(
         questionKey=>
         questionKey === this.currentQuestionPreview.questionId

      )
      if(presentQuestionIndex+1<this.questions.size)
         this.setCurrentPreviewQuestion(Array.from(this.questions.values())[presentQuestionIndex+1].getRequestObject())
   }

   getPreviousQuestion = () =>{
     
      const presentQuestionIndex = Array.from(this.questions.keys()).findIndex(
         questionKey=>
         questionKey === this.currentQuestionPreview.questionId

      )
      if(presentQuestionIndex>0)
       this.setCurrentPreviewQuestion(Array.from(this.questions.values())[presentQuestionIndex-1].getRequestObject())
   }

   @computed
   get totalQuestions(){
      return Array.from(this.questions.values()).filter(each=>
         each.questionType!==WELCOME_SCREEN&&each.questionType!==THANK_YOU_SCREEN
      ).length;
   }

   @computed 
   get currentQuestionNumber(){
      const onlyQuestions = Array.from(this.questions.values()).filter(each=>
         each.questionType!==WELCOME_SCREEN&&each.questionType!==THANK_YOU_SCREEN
      );
      if(this.currentQuestionPreview!==null)
      {const indexOfTheQuestion = onlyQuestions.findIndex(each=>
         each.questionId === this.currentQuestionPreview.questionId
      )
      return indexOfTheQuestion+1;
   }
   else
      return 0;

   }

   @computed
   get questionListSize(){
      return this.questions.size;
   }

   @action
   getQuestionNumber = questionId =>{
      const onlyQuestions = Array.from(this.questions.values()).filter(each=>
         each.questionType!==WELCOME_SCREEN&&each.questionType!==THANK_YOU_SCREEN
      );
   
      const indexOfTheQuestion = onlyQuestions.findIndex(each=>
         each.questionId === questionId
      )
      return indexOfTheQuestion+1;
   }

   @action
   setCurrentPreviewQuestion = (question) =>{
      const {
         question_type
      } = question;
      switch (question_type) {
         case MULTIPLE_CHOICE:
            question.choice_response_details= {
               
               response_choice:null
               
            }
            this.currentQuestionPreview = new McqPreviewModel(question)
            console.log(this.currentQuestionPreview)
            break
         case WELCOME_SCREEN:
            this.currentQuestionPreview = new QuestionModel(question)
            break
         case THANK_YOU_SCREEN:
            this.currentQuestionPreview = new QuestionModel(question)
            break
         case SHORT_TEXT:
            question.text_response_details = {
               response_text : ''
            }
            this.currentQuestionPreview = new TextqPreviewModel(question)
            console.log(this.currentQuestionPreview)
            break
         case LONG_TEXT:
            question.text_response_details = {
               response_text : ''
            }
            this.currentQuestionPreview = new TextqPreviewModel(question)
            console.log(this.currentQuestionPreview)
            break
      }
   }

   @action
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
                  required: false,
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
                  required: false,
                  multiple_choice_question_details: null
               })
            )
      }
      const current = this.questions.get(this.newQuestionCount+1);
      this.setCurrentPreviewQuestion(current.getRequestObject());
      
   }

   @computed
   get isPublishing(){
      return this.getPublishStatus===API_FETCHING;
   }
}

export { QuestionsStore }
