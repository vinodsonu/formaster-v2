import Cookie from 'js-cookie'
/*global jest*/
/*global expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'



import getPreviewResponse from '../../fixtures/getPreviewDetails.json'

import PreviewStore from '.'
import QuestionPreviewService from '../../services/QuestionPreviewService/QuetionPreviewFixtures'


describe('PreviewStore test', () => {
   let questionApi
   let previewStore

   beforeEach(() => {
        questionApi = new QuestionPreviewService()
        previewStore = new PreviewStore(questionApi)
   })

   it('Should test initializong the PreviewStore', () => {
      const {
        getPreviewQuestionsApitatus,
        getPreviewQuestionsApiError,
        getSubmitQuestionApiStatus,
       getSubmitQuestionApiError,
       question
      } = previewStore

      expect(getPreviewQuestionsApitatus).toBe(API_INITIAL)
      expect(getSubmitQuestionApiStatus).toBe(API_INITIAL)
      expect(getPreviewQuestionsApiError).toBe(null)
      expect(getSubmitQuestionApiError).toBe(null)
      expect(question).toMatchObject({})
   })

   it('Should test previewStore data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockLoadingPromise)

      questionApi.getPreviewQuestion = mockSignInAPI

      previewStore.userPreview()

      expect(previewStore.getPreviewQuestionsApitatus).toBe(API_FETCHING)
   })


   it('Should test previewStore data success state', async() => {
    const mockLoadingPromise = Promise.resolve(getPreviewResponse[0])
    const mockSignInAPI = jest.fn()
    mockSignInAPI.mockReturnValue(mockLoadingPromise)
    questionApi.getPreviewQuestion = mockSignInAPI
    await previewStore.userPreview()

    expect(previewStore.getPreviewQuestionsApitatus).toBe(API_SUCCESS)
 })

   

   it('Should test previewStore failure status', async () => {
      jest.spyOn(questionApi, 'getPreviewQuestion').mockImplementation(() => Promise.reject())

      await previewStore.userPreview()
      expect(previewStore.getPreviewQuestionsApitatus).toBe(API_FAILED)
   })



   it('Should test for clearStore success', () => {
    previewStore.clearStore()
      const {
        getPreviewQuestionsApitatus,
        getPreviewQuestionsApiError,
        getSubmitQuestionApiStatus,
       getSubmitQuestionApiError,
       question
      } = previewStore

      expect(getPreviewQuestionsApitatus).toBe(API_INITIAL)
      expect(getSubmitQuestionApiStatus).toBe(API_INITIAL)
      expect(getPreviewQuestionsApiError).toBe(null)
      expect(getSubmitQuestionApiError).toBe(null)
      expect(question).toMatchObject({})
   })

   it("setPreviewQuestionResponse",()=>{
      getPreviewResponse.forEach(each=>{
         previewStore.setPreviewQuestionResponse(each);
      })
      expect(previewStore.question.questionId).toBe(4)
   })

   it("submitQuestion loading status",async()=>{
      const mockLoadingPromise = Promise.resolve(getPreviewResponse[0])
      const fetchQuestionPromise = jest.fn()
      fetchQuestionPromise.mockReturnValue(mockLoadingPromise)
      questionApi.getPreviewQuestion = fetchQuestionPromise
      await previewStore.userPreview()

      const submitLoadingPromise = new Promise(function(resolve, reject) {})
      const submitQuestionPromise = jest.fn()
      submitQuestionPromise.mockReturnValue(submitLoadingPromise)
      questionApi.submitQuestion = submitQuestionPromise
      previewStore.submitQuestion()
      expect(previewStore.getSubmitQuestionApiStatus).toBe(API_FETCHING)
   })

   it("submitQuestion failure status",async()=>{
      const mockLoadingPromise = Promise.resolve(getPreviewResponse[0])
      const fetchQuestionPromise = jest.fn()
      fetchQuestionPromise.mockReturnValue(mockLoadingPromise)
      questionApi.getPreviewQuestion = fetchQuestionPromise
      await previewStore.userPreview()

      const submitLoadingPromise = new Promise(function(resolve, reject) {reject()})
      const submitQuestionPromise = jest.fn()
      submitQuestionPromise.mockReturnValue(submitLoadingPromise)
      questionApi.submitQuestion = submitQuestionPromise
      await previewStore.submitQuestion()
      expect(previewStore.getSubmitQuestionApiStatus).toBe(API_FAILED)
   })

   it("submitQuestion success status",async()=>{
      const mockLoadingPromise = Promise.resolve(getPreviewResponse[0])
      const fetchQuestionPromise = jest.fn()
      fetchQuestionPromise.mockReturnValue(mockLoadingPromise)
      questionApi.getPreviewQuestion = fetchQuestionPromise
      await previewStore.userPreview()

      const submitLoadingPromise = new Promise(function(resolve, reject) {resolve()})
      const submitQuestionPromise = jest.fn()
      submitQuestionPromise.mockReturnValue(submitLoadingPromise)
      questionApi.submitQuestion = submitQuestionPromise
      await previewStore.submitQuestion()
      expect(previewStore.getSubmitQuestionApiStatus).toBe(API_SUCCESS)
   })
})
