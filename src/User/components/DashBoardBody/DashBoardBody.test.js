import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../../Common/constants/RouteConstants'
import getFormResponse from '../../fixtures/getFormResponse.json'

import FormsStore from '../../stores/FormsStore'
import FormService from '../../services/FormService/FormApi'
import QuestionStore from '../../stores/QuestionsStore'
import QuestionService from '../../services/QuestionService/QuesttionApi'
import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'
import FormModel from '../../stores/Models/FormModel'

import DashBoardBody from '.'

describe('Admin Dash Board Body', () => {
   let formStore
   beforeEach(() => {
      formStore = new FormsStore([
         new FormService(),
         new QuestionStore(new FormService())
      ])
   })

   it('should test the render list of forms', async () => {
      const { getByText, getAllByText } = render(
         <DashBoardBody
            forms={getFormResponse.map(each => new FormModel(each))}
            formStore={formStore}
            userProfileDetails={userProfileDetails}
         />
      )

      await waitFor(() => {
         getByText('+')
         getByText(/Accomidation Kit/)
      })
   })
})
