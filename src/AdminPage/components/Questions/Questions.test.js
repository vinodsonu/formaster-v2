import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import questionsResponse from '../../fixtures/getFromQuestions.json'

import QuestionModel from '../../stores/Models/QuestionModel'
import McqTypeModel from '../../stores/Models/McqTypeModel'

/*global jest*/
/*global expect*/

import Questions from '.'

describe('Admin Questions test', () => {
   it(' Questions success render', () => {
      let questions = new Map()
      const getQuestionNumber = jest.fn();
      questionsResponse.questions.forEach(each => {
         if (each.question_type === 'MULTIPLE_CHOICE')
            questions.set(each.question_id, new McqTypeModel(each))
         else questions.set(each.question_id, new QuestionModel(each))
      })

      const { getByPlaceholderText } = render(
         <Questions questions={questions}
                     getQuestionNumber={getQuestionNumber}
         />
      )
      
      getByPlaceholderText('Type welcome message here...')
   })
})
