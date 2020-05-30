import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FAILURE,
   API_SUCCESS,
   API_FETCHING
} from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

export default class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   @observable getUserProfileAPIStatus
   @observable getUserProfileAPIError
   @observable userProfileDetails
   @observable username
   @observable password

   constructor(authService, userProfileService) {
      this.authAPIService = authService
      this.userProfileService = userProfileService
      this.init()
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
      this.getUserProfileAPIStatus = API_INITIAL
      this.getUserProfileAPIError = null
      this.userProfileDetails = null
      this.username = null
      this.password = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setUserSignInAPIResponse(response) {
      setAccessToken(response.access_token)
   }

   @action.bound
   setGetUserSignInAPIStatus(status) {
      this.getUserSignInAPIStatus = status
   }

   @action.bound
   setGetUserSignInAPIError(error) {
      this.getUserSignInAPIError = error
   }

   @action.bound
   setUsername = username => {
      this.username = username
   }

   @action.bound
   setPassword = password => {
      this.password = password
   }

   @action.bound
   userSignIn() {
      const userSigninPromise = this.authAPIService.getAuth(
         this.username,
         this.password
      )
      return bindPromiseWithOnSuccess(userSigninPromise)
         .to(this.setGetUserSignInAPIStatus, this.setUserSignInAPIResponse)
         .catch(this.setGetUserSignInAPIError)
   }

   @action.bound
   setGetUserProfileAPIStatus = status => {
      this.getUserProfileAPIStatus = status
   }

   @action.bound
   setGetUserProfileAPIError = error => {
      this.getUserProfileAPIError = error
   }

   @action.bound
   setUserProfileAPIResponse = response => {
      this.userProfileDetails = response
   }

   @action.bound
   userProfile() {
      const userProfilePromise = this.userProfileService.getUserProfile()
      return bindPromiseWithOnSuccess(userProfilePromise)
         .to(this.setGetUserProfileAPIStatus, this.setUserProfileAPIResponse)
         .catch(this.setGetUserProfileAPIError)
   }

   @computed get isSigningIn() {
      return (
         this.getUserProfileAPIStatus === API_FETCHING ||
         this.getUserSignInAPIStatus === API_FETCHING
      )
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.init()
   }
}
