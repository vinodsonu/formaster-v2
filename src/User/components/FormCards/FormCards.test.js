import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFormResponse from '../../fixtures/getFormResponse.json'

import FormModel from '../../stores/Models/FormModel'

/*global jest*/
/*global expect*/

import FormCards from '.'

describe('Admin FormCards test', () => {
   it('should FormCards success', () => {
       let forms = [];
       getFormResponse[0].result.forEach
         (each=>{
             forms.push(new FormModel(each))
         })
      const { getByText } = render(
         <FormCards forms={forms} />
      )
      getByText(/Feedback Form/)
   })
})
