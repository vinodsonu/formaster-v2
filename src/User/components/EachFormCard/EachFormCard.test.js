import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFormResponse from '../../fixtures/getFormResponse.json'

import FormModel from '../../stores/Models/FormModel'

/*global jest*/
/*global expect*/

import EachFormCard from '.'

describe('Admin EachFormCard test', () => {
   it('should EachFormCard success', () => {
      const { getByText } = render(
         <EachFormCard form={new FormModel(getFormResponse[0].result[0])} />
      )
      getByText(/Feedback Form/)
   })
})
