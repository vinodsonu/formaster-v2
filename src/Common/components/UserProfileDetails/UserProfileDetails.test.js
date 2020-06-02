import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'

/*global jest*/
/*global expect*/

import UserProfileDetails from '.'

describe('Admin UserProfileDetails test', () => {
   it('should UserProfileDetails success', () => {
      const { getByText, getByTestId } = render(
         <UserProfileDetails userProfileDetails={userProfileDetails} />
      )
      getByText(/Muneera Shaik/)
      fireEvent.click(getByTestId('user-profile'))
   })
})
