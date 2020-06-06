import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING
} from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken, clearUserSession } from '../../../Common/utils/StorageUtils'

import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';


export default class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   @observable getUserProfileAPIStatus
   @observable getUserProfileAPIError
   @observable userProfileDetails
   @observable getSignupApiStatus
   @observable getSignupApiError
   @observable getSignOutApiStatus
   @observable getSignOutApiError


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
      this.userProfileDetails = null;
      this.getSignupApiStatus = API_INITIAL;
      this.getSignupApiError = null;
      this.getSignOutApiStatus = API_INITIAL;
      this.getSignOutApiError = null;
   
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
   setGetUserSignInAPIError(e) {
      
      this.getUserSignInAPIError = e;
      error(getUserDisplayableErrorMessage(this.getUserSignInAPIError))
      
   }

   @action.bound
   setUsername(username){
      this.username = username
   }

   @action.bound
   setPassword(password){
      this.password = password
   }

   @action.bound
   userSignIn(userAuthenticationDetails) {
      
      const userSigninPromise = this.authAPIService.getAuth(userAuthenticationDetails)
      return bindPromiseWithOnSuccess(userSigninPromise)
         .to(this.setGetUserSignInAPIStatus,this.setUserSignInAPIResponse)
         .catch(this.setGetUserSignInAPIError)
   }

   @action.bound
   setGetUserProfileAPIStatus(status){
    
      this.getUserProfileAPIStatus = status
   }

   @action.bound
   setGetUserProfileAPIError(error){
      this.getUserProfileAPIError = error
   }

   @action.bound
   setUserProfileAPIResponse(response){
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
   setGetSignupApiStatus(status){
      
      this.getSignupApiStatus = status;
   }
   
   @action.bound
   setSignUpResponse(response){
      success()
   }
   
   @action.bound
   setGetSignupApiError(e){
      this.getSignupApiError = e;
      error(getUserDisplayableErrorMessage(e))
   }
   @action.bound
   userSignUp(details){
      const userSignUpPromise = this.authAPIService.onUserSignup(details);
      return bindPromiseWithOnSuccess(userSignUpPromise)
         .to(this.setGetSignupApiStatus, this.setSignUpResponse)
         .catch(this.setGetSignupApiError)
   }
   
   @computed
   get isSigningup(){
      
      return this.getSignupApiStatus===API_FETCHING;
   }

   @action.bound
   setGetSignOutApiError(error){
      this.getSignOutApiError = error;
   }

   @action.bound
   setGetSignOutApiStatus(status){
      this.getSignOutApiStatus = status;
   }

   @action.bound
   userSignOut() {
      const onUserSignOutPromise = this.authAPIService.onUserSignOut();
      return bindPromiseWithOnSuccess(onUserSignOutPromise)
         .to(this.setGetSignOutApiStatus,(response)=>{
            clearUserSession();
            this.init();
         })
         .catch(this.setGetSignOutApiError)
   
      
   }
}
