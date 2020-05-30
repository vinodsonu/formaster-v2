import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import questionsResponse from '../../fixtures/getFromQuestions.json'

import QuestionModel from '../../stores/Models/QuestionModel'

/*global jest*/
/*global expect*/

import GreetingScreen from '.'

describe('Admin GreetingScreen test', () => {
   it('should GreetingScreen success', () => {
      const { getByText } = render(
         <GreetingScreen
            question={new QuestionModel(questionsResponse.questions[0])}
         />
      )
      // getByText(/Welcom to our Website/)
   })
})
