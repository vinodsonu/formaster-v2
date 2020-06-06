import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../constants/RouteConstants'

import QuestionService from '../../services/QuestionService/QuesttionApi'
import AuthStore from '../../../Authentication/stores/AuthStore'
import AuthService from '../../../Authentication/services/AuthService/AuthAPI'
import getFormResponse from '../../fixtures/getFormResponse.json'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'
import QuestionsStore from '../../stores/QuestionsStore'
import questionsResponse from '../../fixtures/getFromQuestions.json'

import CreateRoute from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('CreateRoute test', () => {
   let questionsStore
   let authStore
   let queApi
   beforeEach(() => {
      queApi = new QuestionService()
      questionsStore = new QuestionsStore(queApi)
      authStore = new AuthStore(new AuthService(), new UserProfileService())
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should test Retry success', async () => {
      const { getByText } = render(
         <Provider authStore={authStore} questionsStore={questionsStore}>
            <Router history={createMemoryHistory()}>
               <CreateRoute />
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(questionsResponse)
      })
      const mockGetForm = jest.fn()
      mockGetForm.mockReturnValue(mockSuccessPromise)

      queApi.getFormDetails = mockGetForm

      // waitFor(() => {
      //    getByText('Something went wrong please try again')
      // })
   })
})
