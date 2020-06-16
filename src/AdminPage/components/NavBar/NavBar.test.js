import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import userProfileDetails from '../../../Authentication/fixtures/getUserProfileResponse.json'

/*global jest*/
/*global expect*/

import NavBar from '.'

describe('Admin NavBar test', () => {
   it('should NavBar success', () => {
      const { getAllByText,getByText } = render(
         <Router history={createMemoryHistory()}>
            <NavBar
               formName={'Form Name'}
               userProfileDetails={userProfileDetails}
            />
         </Router>
      )
      getAllByText(/Muneera Shaik/)
      getByText(/publish/)
   })
})
