import Cookie from 'js-cookie'
/*global jest*/
/*global expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'


import getFormResponse from '../../fixtures/getFormResponse.json'

import UserFormStore from '.'
import FormFixtureService from '../../services/FormService/FormFixture'
import PaginationStore from "../../../Common/stores/PaginationStore"



describe('User Form Store test', () => {
   let formApi
   let formStore

   beforeEach(() => {
      formApi = new FormFixtureService()
      formStore = new UserFormStore(formApi,PaginationStore)
   })

   it('Should test initializong the form store', () => {
      const {
        forms,
        getFormsApiStatus,
        getFormApiError
      } = formStore

      expect(getFormsApiStatus).toBe(API_INITIAL)
      expect(getFormApiError).toBe(null)
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

   it('Should test user GetFromApi Success', async () => {
      const mockSuccessPromise = Promise.resolve(getFormResponse[0])

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockSuccessPromise)

      formApi.getForms = mockSignInAPI

      await formStore.getUserForms()

      expect(formStore.getFormsApiStatus).toBe(API_SUCCESS)
   })


   it('Should test Form Details failure status', async () => {
      jest.spyOn(formApi, 'getForms').mockImplementation(() => Promise.reject())

      await formStore.getUserForms()
      expect(formStore.getFormsApiStatus).toBe(API_FAILED)
   })



   it('Should test for clearStore success', () => {
      formStore.clearStore()
      const {
        forms,
        getFormsApiStatus,
        getFormApiError
      } = formStore

      expect(getFormsApiStatus).toBe(API_INITIAL)
      expect(getFormApiError).toBe(null)
      expect(forms).toMatchObject({})
   })
})
