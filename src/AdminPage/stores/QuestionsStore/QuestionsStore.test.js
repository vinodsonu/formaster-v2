import Cookie from 'js-cookie'
/*global jest*/
/*global expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import QuestionService from '../../services/QuestionService/QuesttionApi'
import getQuestionsResponse from '../../fixtures/getFromQuestions.json'

import QuestionsStore from '.'
import authStore from "../../../Authentication/stores"

describe('Form Store test', () => {
   let questionApi
   let queStore

   beforeEach(() => {
      questionApi = new QuestionService()
      queStore = new QuestionsStore(questionApi)
   })

   it('Should test initializong the Question store', () => {
      const {
         getFormDetailsApiError,
         getFormDetailsApiStatus,
         currentFormId,
         currentQuestionPreview,
         questions,
         newQuestionCount
      } = queStore

      expect(getFormDetailsApiStatus).toBe(API_INITIAL)
      expect(getFormDetailsApiError).toBe(null)
      expect(currentFormId).toBe(null)
      expect(questions).toMatchObject({})
      expect(newQuestionCount).toBe(-1)
   })

   it('Should test getQuestionApi data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockLoadingPromise)

      questionApi.getCurrentFormDetails = mockSignInAPI

      queStore.getTheCurrentFormDetails(10)

      expect(queStore.getFormDetailsApiStatus).toBe(API_FETCHING)
   })

   it('Should test user getQuestionDetails Success', async () => {
      const mockSuccessPromise = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()

      expect(queStore.getFormDetailsApiStatus).toBe(API_SUCCESS)
   })

   it('Should test Form Details failure status', async () => {
      jest
         .spyOn(questionApi, 'getCurrentFormDetails')
         .mockImplementation(() => Promise.reject())

      await queStore.getTheCurrentFormDetails()
      expect(queStore.getFormDetailsApiStatus).toBe(API_FAILED)
   })

   it('Should test for clearStore success', () => {
      queStore.clearStore()
      const {
         getFormDetailsApiError,
         getFormDetailsApiStatus,
         currentFormId,
         currentQuestionPreview,
         questions,
         newQuestionCount
      } = queStore

      expect(getFormDetailsApiStatus).toBe(API_INITIAL)
      expect(getFormDetailsApiError).toBe(null)
      expect(currentFormId).toBe(null)
      expect(questions).toMatchObject({})
      expect(newQuestionCount).toBe(-1)
   })

   it("onDeleteQuestion loading status",()=>{
      const mockSuccessPromise = new Promise((resolve,reject)=>{})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.onDeleteQuestion = mockDeleteQuestionApi
       queStore.onDeleteQuestion()
      expect(queStore.getDeleteQuestionApiStatus).toBe(API_FETCHING);
   })

   it("onDeleteQuestion failure status",async()=>{
      const mockSuccessPromise = new Promise((resolve,reject)=>{reject()})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.onDeleteQuestion = mockDeleteQuestionApi
      await queStore.onDeleteQuestion()
      expect(queStore.getDeleteQuestionApiStatus).toBe(API_FAILED);
   })

   it("onDeleteQuestion success status",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()

      const mockSuccessPromise = new Promise((resolve,reject)=>{resolve()})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.onDeleteQuestion = mockDeleteQuestionApi
      await queStore.onDeleteQuestion(2)
      expect(queStore.getDeleteQuestionApiStatus).toBe(API_SUCCESS);
      expect(queStore.questions.size).toBe(getQuestionsResponse.questions.length-1)
   })

   it("onPublish loading status",()=>{
      const mockSuccessPromise = new Promise((resolve,reject)=>{})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.publishCurrentFormDetails = mockDeleteQuestionApi
       queStore.onPublish()
      expect(queStore.getPublishStatus).toBe(API_FETCHING);
   })

   it("onPublish failure status",async()=>{
      const mockSuccessPromise = new Promise((resolve,reject)=>{reject()})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.publishCurrentFormDetails = mockDeleteQuestionApi
       await queStore.onPublish()
      expect(queStore.getPublishStatus).toBe(API_FAILED);
   })

   it("onPublish success status",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()

      const mockSuccessPromise = new Promise((resolve,reject)=>{resolve()})
      const mockDeleteQuestionApi = jest.fn()
      mockDeleteQuestionApi.mockReturnValue(mockSuccessPromise)
      questionApi.publishCurrentFormDetails = mockDeleteQuestionApi
       await queStore.onPublish()
      expect(queStore.getPublishStatus).toBe(API_SUCCESS);
   })

   it("onClickQuestion",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      queStore.onClickQuestion(2)
      expect(queStore.currentQuestionPreview.questionId).toBe(getQuestionsResponse.questions[2].question_id)
   })

   it("getNextQuestion",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      queStore.onClickQuestion(1)
      queStore.getNextQuestion()
      expect(queStore.currentQuestionPreview.questionId).toBe(getQuestionsResponse.questions[2].question_id)
   })

   it("getPreviousQuestion",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      queStore.onClickQuestion(2)
      queStore.getPreviousQuestion()
      expect(queStore.currentQuestionPreview.questionId).toBe(getQuestionsResponse.questions[1].question_id)
   })

   it("totalQuestions",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      expect(queStore.totalQuestions).toBe(2)
   })

   it("currentQuestionNumber && questionListSize && getQuestionNumber",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      queStore.onClickQuestion(2)
      expect(queStore.currentQuestionNumber).toBe(2)
      expect(queStore.questionListSize).toBe(4)
      expect(queStore.getQuestionNumber(1)).toBe(1)
   })

   it("setCurrentPreviewQuestion",async()=>{
      const mockSuccess = Promise.resolve(getQuestionsResponse)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccess)
      questionApi.getCurrentFormDetails = mockSignInAPI
      await queStore.getTheCurrentFormDetails()
      getQuestionsResponse.questions.forEach(each=>{
         queStore.setCurrentPreviewQuestion(each);
      })
      expect(queStore.currentQuestionPreview.questionId).toBe(3)
   })

   it("addNewQuestion",()=>{
      queStore.addNewQuestion(getQuestionsResponse.questions[1]);
      expect(queStore.questions.size).toBe(1)
   })

   it("isPublishing",()=>{
      expect(queStore.isPublishing).toBe(false);
   })
})
