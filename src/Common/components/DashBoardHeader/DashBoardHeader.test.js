import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'

/*global jest*/
/*global expect*/

import DashBoardHeader from '.'

describe('Admin DashBoardHeader test', () => {
   it('should DashBoardHeader success', () => {
      const { getAllByText } = render(
         <DashBoardHeader userProfileDetails={userProfileDetails} />
      )
      getAllByText(/Muneera Shaik/)
   })
})
