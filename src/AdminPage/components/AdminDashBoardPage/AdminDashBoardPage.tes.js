import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import getFormResponse from '../../fixtures/getFormResponse.json'
import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'
import FormModel from '../../stores/Models/FormModel'

import AdminDashBoardPage from '.'

describe('Admin DashBoard test', () => {
   it('should test the list of forms', () => {
      const { getByText } = render(
         <AdminDashBoardPage
            froms={getFormResponse.map(each => new FormModel(each))}
            userProfileDetails={userProfileDetails}
         />
      )

      waitFor(() => {
         getByText(/Muneera Shaik/)
         getByText(/New Form/)
      })
   })
})
