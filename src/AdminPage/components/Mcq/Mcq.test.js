import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import getFromQuestions from '../../fixtures/getFromQuestions.json'

import McqTypeModel from '../../stores/Models/McqTypeModel'

/*global jest*/
/*global expect*/

import Mcq from '.'

describe('Admin Mcq test', () => {
   it('should Mcq success', () => {
       const getQuestionNumber = jest.fn();
      const { getByPlaceholderText } = render(
         <Mcq question={new McqTypeModel(getFromQuestions.questions[2])}
              getQuestionNumber={getQuestionNumber}
         />
      )
      expect(getByPlaceholderText('Type question here...').value).toBe("your known languages ? ")
   })
   
   it('should onChangeMcqQuestion text success', () => {
       const getQuestionNumber = jest.fn();
      const { getByPlaceholderText } = render(
         <Mcq question={new McqTypeModel(getFromQuestions.questions[2])}
              getQuestionNumber={getQuestionNumber}
         />
      )
      const mcqQuestion = getByPlaceholderText('Type question here...');
      const questionText = 'you favourite falovour of ice cream ?'
      fireEvent.change(mcqQuestion,{target:{value:questionText}})
      expect(mcqQuestion.value).toBe(questionText)
   })
   it('should onChangeMcqChoice text success', () => {
       const getQuestionNumber = jest.fn();
      const { getAllByPlaceholderText,getByText } = render(
         <Mcq question={new McqTypeModel(getFromQuestions.questions[2])}
              getQuestionNumber={getQuestionNumber}
         />
      )
      const mcqChoice =  getAllByPlaceholderText("choice")[3];
      const mcqChoiceText = 'tamil';
      expect(mcqChoice.value).toBe('');
      fireEvent.change(mcqChoice,{target:{value:mcqChoiceText}});
      expect(mcqChoice.value).toBe(mcqChoiceText);
   })
})