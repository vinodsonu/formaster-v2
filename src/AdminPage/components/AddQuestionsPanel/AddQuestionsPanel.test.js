import React from 'react'
/*global expect*/
import { render } from '@testing-library/react'
import questions from '../../fixtures/getFromQuestions.json'
import McqTypeModel from '../../stores/Models/McqTypeModel'
import QuestionModel from '../../stores/Models/QuestionModel'

import AddQuestionsPanel from '.'

describe('AddQuestionsPanel test', () => {
   it('should test the list Of Questions', () => {
      const { getByTestId } = render(
         <AddQuestionsPanel
            questions={questions.questions.map(each => {
               if (each.question_type === 'MULTIPLE_CHOICE')
                  return new McqTypeModel(each)
               else return new QuestionModel(each)
            })}
            getQuestionNumber={()=>{}}
         />
      )
      expect(getByTestId('list-of-questions').children.length).toBe(6)
   })
})
