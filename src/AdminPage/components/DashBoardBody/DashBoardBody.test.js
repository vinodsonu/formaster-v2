import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../constants/RouteConstants'
import getFormResponse from '../../fixtures/getFormResponse.json'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'
import FormModel from '../../stores/Models/FormModel'

import DashBoardBody from '.'

describe('Admin Dash Board Body', () => {
   it('should test the render list of forms', async () => {
      const { getByText, getAllByText } = render(
         <DashBoardBody
            forms={getFormResponse.forms.map(each => new FormModel(each))}
            userProfileDetails={userProfileDetails}
         />
      )

         getByText('+')
         getByText(/Accomidation Kit/)
   })
})
