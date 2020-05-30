import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../constants/RouteConstants'

import FormApi from '../../services/FormService/FormApi'

import FormStore from '../../stores/FormsStore'
import QuestionService from '../../services/QuestionService/QuesttionApi'
import AuthStore from '../../../Authentication/stores/AuthStore'
import AuthService from '../../../Authentication/services/AuthService/AuthAPI'
import getFormResponse from '../../fixtures/getFormResponse.json'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'
import QuestionsStore from '../../stores/QuestionsStore'

import AdminRoute from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('AdminRoute test', () => {
   let formApi
   let formStore
   let questionsStore
   let authStore
   beforeEach(() => {
      questionsStore = new QuestionsStore(new QuestionService())
      formApi = new FormApi()
      formStore = new FormStore(formApi, questionsStore)
      authStore = new AuthStore(new AuthService(), new UserProfileService())
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should test Retry success', async () => {
      const { getByText } = render(
         <Provider
            authStore={authStore}
            formStore={formStore}
            questionsStore={questionsStore}
         >
            <Router history={createMemoryHistory()}>
               <AdminRoute />
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getFormResponse)
      })
      const mockGetForm = jest.fn()
      mockGetForm.mockReturnValue(mockSuccessPromise)

      formApi.getForms = mockGetForm

      await waitFor(() => {
         getByText('Something went wrong please try again')
      })
   })
})
