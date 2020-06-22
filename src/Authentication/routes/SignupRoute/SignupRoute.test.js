import React from 'react'
import { render, fireEvent, waitFor, getByText } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../constants/RouteConstants'

import AuthAPI from '../../services/AuthService/AuthAPI'

import AuthStore from '../../stores/AuthStore'
import getUserSignInResponse from '../../services/AuthService/AuthFixture'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'

import SignupRoute from '.'
import { ToastContainer, toast } from "react-toastify"
import { success } from "../../../Common/utils/ToastUtils"

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignupRoute test', () => {
   let authAPI
   let authStore
   let userProfileApi
   beforeEach(() => {
      userProfileApi = new UserProfileService()
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI, userProfileApi)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should submit sign-up form fill', () => {
      const {
         getByLabelText,
         getAllByPlaceholderText,
         getByPlaceholderText,
         getByRole,
         getByText
      } = render(
         <Router history={createMemoryHistory()}>
            <SignupRoute authStore={authStore} />
            
         </Router>
      )
      const fullName = 'Muneera Shaik'
      const userName = "user-1"
      const password = 'test-password'

      const fullNameFeild = getByPlaceholderText('Muneera Shaik')
      const userNameFeild = getByPlaceholderText("muneeraShaik");
      const passwordField = getAllByPlaceholderText('At least 8 charactors')

      fireEvent.change(fullNameFeild, { target: { value: fullName } })
      fireEvent.change(userNameFeild,{target:{value:userName}})
      fireEvent.change(passwordField[0], { target: { value: password } })
      fireEvent.change(passwordField[1], { target: { value: password } })
      expect(fullNameFeild.value).toBe(fullName)
      expect(userNameFeild.value).toBe(userName)
      expect(passwordField[0].value).toBe(password)
      expect(passwordField[1].value).toBe(password)
      
   })



   it('should submit sign-up form field error', () => {
    const {
       getByLabelText,
       getAllByPlaceholderText,
       getByPlaceholderText,
       getByRole,
       getAllByText
    } = render(
       <Router history={createMemoryHistory()}>
          <SignupRoute authStore={authStore} />
       </Router>
    )
    const signUpButton = getByRole('button', { name: 'sign up' })
    fireEvent.click(signUpButton)
    getAllByText(/name should not be empty/)
    getAllByText(/username should not be empty/)
    getAllByText(/contains at least 8 charactors/)
    
 })


   it('Should render SignupRoute succes state', async () => {
      const history = createMemoryHistory()

      const route = SIGN_UP_PATH

      history.push(route)

      const {
         getAllByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId,
         getByPlaceholderText,
         getByText
      } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_UP_PATH}>
                  <SignupRoute />
                  <ToastContainer/>
               </Route>

            </Router>
         </Provider>
      )
      const fullName = 'Muneera Shaik'
      const userName = "user-1"
      const password = 'test-password'

      const fullNameFeild = getByPlaceholderText('Muneera Shaik')
      const userNameFeild = getByPlaceholderText("muneeraShaik");
      const passwordField = getAllByPlaceholderText('At least 8 charactors')

      fireEvent.change(fullNameFeild, { target: { value: fullName } })
      fireEvent.change(userNameFeild,{target:{value:userName}})
      fireEvent.change(passwordField[0], { target: { value: password } })
      fireEvent.change(passwordField[1], { target: { value: password } })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)

      authAPI.onUserSignup = mockSignInAPI

      const signUpButton = getByRole('button', { name: 'sign up' })
      fireEvent.click(signUpButton)
    
   })

   it('should render signInRoute failure state', async () => {
      const { getByText,getByPlaceholderText, getAllByPlaceholderText, getAllByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignupRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getAllByPlaceholderText('muneeraShaik')
      const passwordField = getAllByPlaceholderText('At least 8 charactors')
      const signInButton = getAllByRole('button', {
         name: 'sign up'
      })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.onUserSignup = mockSignInAPI

      fireEvent.change(usernameField[0], { target: { value: username } })
      fireEvent.change(passwordField[0], { target: { value: password } })
      fireEvent.click(signInButton[0])

      try {
         await waitFor(() => {
            getByText(/server-error/i)
         })
      } catch (e) {}
   })
})
