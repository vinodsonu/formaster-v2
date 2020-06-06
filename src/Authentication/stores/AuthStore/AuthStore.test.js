import Cookie from 'js-cookie'
/*global jest*/
/*global expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import AuthAPI from '../../services/AuthService/AuthAPI'
import UserProfileService from '../../services/UserProfileService/UserProfileAPI'
import getUserSignInResponse from '../../fixtures/signInAPIResponse.json'
import getUserProfileResponse from '../../fixtures/getUserProfileResponse.json'

import AuthStore from '.'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('AuthStore Test', () => {
   let authAPI
   let authStore
   let userProfileApi

   beforeEach(() => {
      authAPI = new AuthAPI()
      userProfileApi = new UserProfileService()
      authStore = new AuthStore(authAPI, userProfileApi)
   })

   it('Should test initializong the auth store', () => {
      const {
         getUserSignInAPIStatus,
         getUserSignInAPIError,
         getUserProfileAPIError,
         getUserProfileAPIStatus
      } = authStore
      expect(getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(getUserSignInAPIError).toBe(null)
      expect(getUserProfileAPIStatus).toBe(API_INITIAL)
      expect(getUserProfileAPIError).toBe(null)
   })

   it('Should test SignInAPT data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockLoadingPromise)

      authAPI.getAuth = mockSignInAPI

      authStore.userSignIn()

      expect(authStore.getUserSignInAPIStatus).toBe(API_FETCHING)
   })

   it('Should test UserProfile data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockUserProfileApi = jest.fn()

      mockUserProfileApi.mockReturnValue(mockLoadingPromise)

      userProfileApi.getUserProfile = mockUserProfileApi

      authStore.userProfile()

      expect(authStore.getUserProfileAPIStatus).toBe(API_FETCHING)
   })

   it('Should test user SignInAPI Success', async () => {
      const mockSuccessPromise = Promise.resolve(getUserSignInResponse)

      const mockSignInAPI = jest.fn()

      mockSignInAPI.mockReturnValue(mockSuccessPromise)

      authAPI.getAuth = mockSignInAPI

      await authStore.userSignIn()

      expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS)

      expect(mockSetCookie).toBeCalled()
   })

   it('Should test user UserProfile Success', async () => {
      const mockSuccessPromise = Promise.resolve(getUserSignInResponse)

      const mockUserProfileApi = jest.fn()

      mockUserProfileApi.mockReturnValue(mockSuccessPromise)

      userProfileApi.getUserProfile = mockUserProfileApi

      await authStore.userProfile()

      expect(authStore.getUserProfileAPIStatus).toBe(API_SUCCESS)

      expect(mockSetCookie).toBeCalled()
   })

   it('Should test userSignIn API failure status', async () => {
      jest.spyOn(authAPI, 'getAuth').mockImplementation(() => Promise.reject())

      await authStore.userSignIn()
      expect(authStore.getUserSignInAPIStatus).toBe(API_FAILED)
   })

   it('Should test userProfile API failure status', async () => {
      const mockSuccessPromise = Promise.resolve(getUserSignInResponse)

      const mockUserProfileApi = jest.fn()

      mockUserProfileApi.mockReturnValue(mockSuccessPromise)

      userProfileApi.getUserProfile = mockUserProfileApi

      await authStore.userProfile()

      expect(authStore.userProfileDetails).toMatchObject(getUserSignInResponse)

      expect(mockSetCookie).toBeCalled()
   })

   it('Should test userProfile API data success', async () => {
      jest
         .spyOn(userProfileApi, 'getUserProfile')
         .mockImplementation(() => Promise.reject())

      await authStore.userProfile()
      expect(authStore.getUserProfileAPIStatus).toBe(API_FAILED)
   })

   
   it('Should test for clearStore success', () => {
      authStore.clearStore()
      expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserSignInAPIError).toBe(null)
   })
})
