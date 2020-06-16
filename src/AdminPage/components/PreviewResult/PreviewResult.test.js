import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFromQuestions from '../../fixtures/getFromQuestions.json'

import McqTypeModel from '../../stores/Models/McqTypeModel'

/*global jest*/
/*global expect*/

import PreviewResult from '.'

describe('Admin PreviewResult test', () => {
   it('should PreviewResult success', () => {
      const getQuestionNumber = jest.fn();
      const { getByPlaceholderText,getByText } = render(
         <PreviewResult currentQuestionPreview={new McqTypeModel(getFromQuestions.questions[2])}
              getQuestionNumber={getQuestionNumber}
         />
    )
      getByText(/your known languages ?/)
      getByText(/Urdu/)
      getByText(/English/)
      getByText(/Hindi/)
   })
})
