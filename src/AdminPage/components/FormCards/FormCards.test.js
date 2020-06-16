import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFormResponse from '../../fixtures/getFormResponse.json'

import FormModel from '../../stores/Models/FormModel'

/*global jest*/
/*global expect*/

import FormCards from '.'

describe('Admin FormCards test', () => {
   it('should FormCards success', () => {
       let forms = new Map();
       getFormResponse.forms.forEach
         (each=>{
             forms.set(each.form_id,new FormModel(each))
         })
      const { getByText } = render(
         <FormCards forms={forms} />
      )
      getByText(/Feedback Form/)
   })
})
