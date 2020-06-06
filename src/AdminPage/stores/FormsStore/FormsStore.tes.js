import Cookie from 'js-cookie'
/*global jest*/
/*global expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import FormApiService from '../../services/FormService/FormApi'
import QuestionService from '../../services/QuestionService/QuesttionApi'
import getFormResponse from '../../fixtures/getFormResponse.json'

import {FormsStore} from './FormsStore'
import QuestionsStore from '../QuestionsStore'

describe('Form Store test', () => {
   let formApi
   let queStore
   let formStore

   beforeEach(() => {
      formApi = new FormApiService()
      queStore = new QuestionsStore(new QuestionService())
      formStore = new FormsStore(formApi, queStore)
   })

   it('Should test initializong the form store', () => {
      const {
         getFormsApiStatus,
         getCreateFormApiStatus,
         getFormApiError,
         getCreateFormApiError,
         forms
      } = formStore

      expect(getCreateFormApiStatus).toBe(API_INITIAL)
      expect(getFormApiError).toBe(null)
      expect(getFormsApiStatus).toBe(API_INITIAL)
      expect(getCreateFormApiError).toBe(null)
      expect(forms).toMatchObject({})
   })

   it('Should test GetFromApi data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockLoadingPromise)

      formApi.getForms = mockSignInAPI

      formStore.getUserForms()

      expect(formStore.getFormsApiStatus).toBe(API_FETCHING)
   })

   it('Should test CrateForm data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockUserProfileApi = jest.fn()

      mockUserProfileApi.mockReturnValue(mockLoadingPromise)

      formApi.createNewForm = mockUserProfileApi

      formStore.onCreateNewForm()

      expect(formStore.getCreateFormApiStatus).toBe(API_FETCHING)
   })

   it('Should test user GetFromApi Success', async () => {
      const mockSuccessPromise = Promise.resolve(getFormResponse)

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockSuccessPromise)

      formApi.getForms = mockSignInAPI

      await formStore.getUserForms()

      expect(formStore.getFormsApiStatus).toBe(API_SUCCESS)
   })

   it('Should test user CreateForm Success', async () => {
      const mockSuccessPromise = Promise.resolve(getFormResponse)

      const mockUserProfileApi = jest.fn()

      mockUserProfileApi.mockReturnValue(mockSuccessPromise)

      formApi.createNewForm = mockUserProfileApi

      await formStore.onCreateNewForm(10)

      expect(formStore.getCreateFormApiStatus).toBe(API_SUCCESS)
   })

   it('Should test Form Details failure status', async () => {
      jest.spyOn(formApi, 'getForms').mockImplementation(() => Promise.reject())

      await formStore.getUserForms()
      expect(formStore.getFormsApiStatus).toBe(API_FAILED)
   })

   it('Should test Create from API data failure', async () => {
      jest
         .spyOn(formApi, 'createNewForm')
         .mockImplementation(() => Promise.reject())

      await formStore.onCreateNewForm()
      expect(formStore.getCreateFormApiStatus).toBe(API_FAILED)
   })

   it('Should test for clearStore success', () => {
      formStore.clearStore()
      const {
         getFormsApiStatus,
         getCreateFormApiStatus,
         getFormApiError,
         getCreateFormApiError,
         forms
      } = formStore

      expect(getCreateFormApiStatus).toBe(API_INITIAL)
      expect(getFormApiError).toBe(null)
      expect(getFormsApiStatus).toBe(API_INITIAL)
      expect(getCreateFormApiError).toBe(null)
      expect(forms).toMatchObject({})
   })
})
