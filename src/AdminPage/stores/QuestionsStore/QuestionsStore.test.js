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

describe('Form Store test', () => {
   let questionApi
   let queStore

   beforeEach(() => {
      questionApi = new QuestionService()
      queStore = new QuestionsStore(questionApi)
   })

   it('Should test initializong the QUestion store', () => {
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

   it('Should test user GetFormDetails Success', async () => {
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
})
