import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import questionsResponse from '../../fixtures/getFromQuestions.json'

import QuestionModel from '../../stores/Models/QuestionModel'

/*global jest*/
/*global expect*/

import GreetingScreen from '.'

describe('Admin GreetingScreen test', () => {
   it('should welcome GreetingScreen success', () => {
      const { getByPlaceholderText  } = render(
         <GreetingScreen
            question={new QuestionModel(questionsResponse.questions[0])}
         />
      )
      
      expect(getByPlaceholderText("Type welcome message here...").value).toBe("Welcom to our Website")
   })
   
   it('should Thank you GreetingScreen success', () => {
      const { getByPlaceholderText  } = render(
         <GreetingScreen
            question={new QuestionModel(questionsResponse.questions[3])}
         />
      )
      const thankyoufield = getByPlaceholderText("Type Thank You message here...")
      const thankYouMessage = 'Thanks'
      expect(thankyoufield.value).toBe("Thank You")
      fireEvent.change(thankyoufield, { target: { value: thankYouMessage } });
      expect(thankyoufield.value).toBe(thankYouMessage)
      
   })
})
