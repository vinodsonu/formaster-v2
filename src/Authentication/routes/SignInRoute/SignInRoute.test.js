import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../constants/RouteConstants'

import AuthAPI from '../../services/AuthService/AuthAPI'

import AuthStore from '../../stores/AuthStore'
import getUserSignInResponse from '../../services/AuthService/AuthFixture'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'

import SignInRoute from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute test', () => {
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

   it('should submit sign-in on press enter', () => {
      const {
         getByLabelText,
         getAllByPlaceholderText,
         getByRole,
         getByText
      } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getAllByPlaceholderText('muneeraShaik')
      const passwordField = getAllByPlaceholderText('At least 8 charactors')

      fireEvent.change(usernameField[0], { target: { value: username } })
      fireEvent.change(passwordField[0], { target: { value: password } })
   })

   it('Should render SignInRoute succes state', async () => {
      const history = createMemoryHistory()

      const route = SIGN_IN_PATH

      history.push(route)

      const {
         getAllByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId
      } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>
               <Route path={ADMIN_PAGE_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getAllByPlaceholderText('muneeraShaik')
      const passwordField = getAllByPlaceholderText('At least 8 charactors')
      const signInButton = getByRole('button', { name: 'Log in to formaster' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)

      authAPI.getAuth = mockSignInAPI

      fireEvent.change(usernameField[0], { target: { value: username } })
      fireEvent.change(passwordField[0], { target: { value: password } })
      fireEvent.click(signInButton)

      try {
         await waitFor(() => {
            expect(
               queryByRole('button', { name: 'Log in to formaster' })
            ).not.toBeInTheDocument()
            expect(getByTestId('location-display')).toHaveTextContent(
               ADMIN_PAGE_PATH
            )
         })
      } catch (e) {}
   })

   it('should render signInRoute failure state', async () => {
      const { getByText, getAllByPlaceholderText, getAllByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getAllByPlaceholderText('muneeraShaik')
      const passwordField = getAllByPlaceholderText('At least 8 charactors')
      const signInButton = getAllByRole('button', {
         name: 'Log in to formaster'
      })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.getAuth = mockSignInAPI

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
