import React from 'react'
import { observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import SignInPage from '../../components/SignInPage'

import { validatePassword, validateUsername } from '../../utils/ValidationUtils'

import { API_SUCCESS, API_FAILURE } from '@ib/api-constants'

import { ADMIN_PAGE_PATH, USER_PAGE_PATH ,SIGN_UP_PATH} from '../../constants/RouteConstants'

import strings from '../../i18n/strings.json';

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
      const { authStore } = this.props
      return authStore
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
         await this.getAuthStore().userSignIn({username:this.username,password:this.password})
      }
   }
   
   onSignUp = () =>{
      const {history} = this.props;
      history.replace({pathname:SIGN_UP_PATH});
   }

   componentWillUnmount() {
      this.onSuccessUserLogin()
      this.onSuccessUserProfile()
   }

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
         const { history } = this.props
         if (status) {
            history.replace({ pathname: ADMIN_PAGE_PATH })
         }
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
            errorMessage={this.errorMessage}
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
