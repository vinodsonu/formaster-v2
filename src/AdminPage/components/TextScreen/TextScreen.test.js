import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFromQuestions from '../../fixtures/getFromQuestions.json'

import QuestionModel from '../../stores/Models/TextTypeModel'

/*global jest*/
/*global expect*/

import TextScreen from '.'

describe('Admin TextScreen test', () => {
   it('should TextScreen success', () => {
       const getQuestionNumber = jest.fn();
      const { getByPlaceholderText } = render(
         <TextScreen question={new QuestionModel(getFromQuestions.questions[1])}
              getQuestionNumber={getQuestionNumber}
         />
      )
      expect(getByPlaceholderText('Type question here').value).toBe("What is your name ?")
   })
    
    it('should onChangeQuestion text success', () => {
       const getQuestionNumber = jest.fn();
      const { getByPlaceholderText } = render(
         <TextScreen question={new QuestionModel(getFromQuestions.questions[1])}
              getQuestionNumber={getQuestionNumber}
         />
      )
      const question = getByPlaceholderText('Type question here');
      const questionText = 'fullName ?'
    //   fireEvent.change(question,{target:{value:questionText}})
    //   expect(question.value).toBe(questionText)
   })
})