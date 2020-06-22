import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

/*global jest*/
/*global expect*/

import { SIGN_IN_PATH, ADMIN_PAGE_PATH } from '../../../Common/constants/RouteConstants'
import getFormResponse from '../../fixtures/getFormResponse.json'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'
import FormModel from '../../stores/Models/FormModel'

import DashBoardBody from '.'

describe('User Dash Board Body', () => {

   it('should test the render list of forms', async () => {
      const { getByText, getAllByText } = render(
         <DashBoardBody
            forms={getFormResponse[0].result.map(each => new FormModel(each))}
            userProfileDetails={userProfileDetails}
         />
      )

      getByText(/Accomidation Kit/)
      getByText(/Food Form/)
   })
})
