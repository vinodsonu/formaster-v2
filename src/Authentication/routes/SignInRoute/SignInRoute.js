import React from 'react'
import { observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import SignInPage from '../../components/SignInPage'

import { validatePassword, validateUsername } from '../../utils/ValidationUtils'

import { API_SUCCESS, API_FAILED } from '@ib/api-constants'

import { ADMIN_PAGE_PATH, USER_PAGE_PATH ,SIGN_UP_PATH} from '../../constants/RouteConstants'

import strings from '../../i18n/strings.json';

import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';


//Todo:Shifting sign in Validations to sign in page
//Todos:Navigation utils for all Navigations

@inject('authStore')
@observer
class SignInRoute extends React.Component {
   @observable username
   @observable password
   @observable isUsernameError
   @observable isPasswordError
   signInPageRef
   
   componentDidMount(){
      this.signInPageRef.current.usernameRef.current.inputFeildRef.current.focus();
   }
   
   constructor() {
      super()
      this.username = '';
      this.password = '';
      this.isPasswordError = false;
      this.isUsernameError = false;
      this.signInPageRef = React.createRef();
   }

   onChangeUsername = event => {
      this.username = event.target.value;
      this.checkUsernameError();
   }
   
   onKeyDownUsername = event =>{
      const {
         signInpage:{enterKeyCode}
      }  = strings;
      if(event.keyCode===enterKeyCode)
       {  
          this.checkUsernameError();
          if(!this.isUsernameError)
            this.signInPageRef.current.passwordRef.current.inputFeildRef.current.focus();
       }
   }
   
   onKeyDownPassword = event =>{
      const {
         signInpage:{enterKeyCode}
      } = strings
      if( event.keyCode===enterKeyCode && !this.checkForError())
         this.onClickSignIn();
   }

   onChangePassword = event => {
      this.password = event.target.value;
      
   }

   getAuthStore = () => {
      
      return this.props.authStore
   }
   
   checkUsernameError = () =>{
      if(validateUsername(this.username))
         this.isUsernameError = true;
      else
         this.isUsernameError = false;
      return this.isUsernameError;
   }
   
   checkPasswordError = () =>{
      if(validatePassword(this.password))
         this.isPasswordError = true;
      else
         this.isPasswordError = false;
      return this.isPasswordError;
   }


   checkForError = () => {
      this.checkPasswordError();
      this.checkUsernameError();
      return this.isUsernameError||this.isPasswordError;
      
   }

   onClickSignIn = async () => {
      if (!this.checkForError()) {
         await this.getAuthStore().userSignIn(
            {username:this.username,password:this.password}
            )
      }
   }
   
   onSignUp = () =>{
      const {history} = this.props;
      history.replace({pathname:SIGN_UP_PATH});
   }

   componentWillUnmount() {
      this.onSuccessUserLogin()
      this.onSuccessUserProfile()
      this.onFailureUserProfile()
   }

   onSignOutStatuses = reaction(

      ()=>{
         const {getSignOutApiStatus} = this.getAuthStore();
         return getSignOutApiStatus===API_FAILED; 
      },
      (status)=>{
         const {getSignOutApiError} = this.getAuthStore();
         if(status){
            error(getUserDisplayableErrorMessage(getSignOutApiError))
         }
      }

   )

   onSuccessUserLogin = reaction(
      () => {
         try {
            const { getUserSignInAPIStatus } = this.getAuthStore()
            return getUserSignInAPIStatus === API_SUCCESS
         } catch (e) {}
      },
      status => {
         const { history } = this.props
         if (status) {
            this.getUserProfile()
         }
      }
   )

   onSuccessUserProfile = reaction(
      () => {
         try {
            const { getUserProfileAPIStatus } = this.getAuthStore()
            return getUserProfileAPIStatus === API_SUCCESS
         } catch (e) {}
      },
      status => {
         const { userProfileDetails:{role} } = this.getAuthStore();
         const {
            user,
            admin
         } = strings
         const { history } = this.props
         if (status) {
            if(role===admin)
               history.replace({ pathname: ADMIN_PAGE_PATH })
            else if(role===user)
            {  
               history.replace({ pathname: USER_PAGE_PATH })
            }
         }
         
         }
   )

   onFailureUserProfile = reaction(
      ()=>{
         try{
         const {getUserProfileAPIStatus} = this.getAuthStore();
         return getUserProfileAPIStatus===API_FAILED;
         }
         catch(e){}
      },
      (status)=>{
         const {getUserProfileAPIError} = this.getAuthStore();
         if(status)
                  error(getUserDisplayableErrorMessage(getUserProfileAPIError))
      }
   )

   getUserProfile = async () => {
      await this.getAuthStore().userProfile()
   }

   render() {
      const { isSigningIn } = this.getAuthStore()
      return (
         <SignInPage
            username={this.username}
            onChangePassword={this.onChangePassword}
            onChangeUsername={this.onChangeUsername}
            password={this.password}
            onClickSignIn={this.onClickSignIn}
            isSigningIn={isSigningIn}
            errorMessage={this.errorMessage}
            ref = {this.signInPageRef}
            onKeyDownPassword={this.onKeyDownPassword}
            onKeyDownUsername={this.onKeyDownUsername}
            isUsernameError = {this.isUsernameError}
            isPasswordError = {this.isPasswordError}
            onSignUp = {this.onSignUp}
         />
      )
   }
}

export default withRouter(SignInRoute)
