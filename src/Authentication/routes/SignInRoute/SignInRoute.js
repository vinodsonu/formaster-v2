import React from 'react'
import { observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import SignInPage from '../../components/SignInPage'

import { validatePassword, validateUsername } from '../../utils/ValidationUtils'

import { API_SUCCESS, API_FAILURE } from '@ib/api-constants'

import { ADMIN_PAGE_PATH, USER_PAGE_PATH } from '../../constants/RouteConstants'

@inject('authStore')
@observer
class SignInRoute extends React.Component {
   @observable username
   @observable password
   @observable errorMessage
   @observable isClickedLogin

   constructor() {
      super()
      this.username = ''
      this.password = ''
      this.errorMessage = ''
      this.isClickedLogin = false
   }

   onChangeUsername = event => {
      this.username = event.target.value
   }

   onChangePassword = event => {
      this.password = event.target.value
   }

   getAuthStore = () => {
      const { authStore } = this.props
      return authStore
   }

   isUsernameEmpty = () => {
      return validateUsername(this.username) && this.isClickedLogin
   }

   isPasswordError = () => {
      return validatePassword(this.password) && this.isClickedLogin
   }

   checkForError = () => {
      return this.isPasswordError() || this.isUsernameEmpty()
   }

   onClickSignIn = async () => {
      this.isClickedLogin = true
      if (!this.checkForError()) {
         const { setUsername, setPassword } = this.getAuthStore()
         setPassword(this.password)
         setUsername(this.username)
         await this.getAuthStore().userSignIn()
      }
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
            // history.replace({ pathname:ADMIN_PAGE_PATH })
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
      this.getAuthStore().userProfile()
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
            isUsernameEmpty={this.isUsernameEmpty()}
            isPasswordError={this.isPasswordError()}
            errorMessage={this.errorMessage}
         />
      )
   }
}

export default withRouter(SignInRoute)
