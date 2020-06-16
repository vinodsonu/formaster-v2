import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'

/*global jest*/
/*global expect*/

import CreateFormPage from '.'

describe('Admin CreateFormPage test', () => {
   it('should CreateFormPage success', () => {
      const { getByText } = render(
         <Router history={createMemoryHistory()}>
            <CreateFormPage
               form={{ formId: 1, formName: 'snack form' }}
               userProfileDetails={userProfileDetails}
               currentQuestionPreview = {{questionId:1}}
               questions = {new Map()}
            />
         </Router>
      )

      getByText(/THANK_YOU_SCREEN/)
      getByText(/WELCOME_SCREEN/)
      getByText(/SHORT_TEXT/)
      getByText(/LONG_TEXT/)
       getByText(/MULTIPLE_CHOICE/)
   })
})
