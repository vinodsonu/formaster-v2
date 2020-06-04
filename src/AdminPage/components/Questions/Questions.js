import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   WELCOME_SCREEN,
   THANK_YOU_SCREEN,
   SHORT_TEXT,
   LONG_TEXT,
   MULTIPLE_CHOICE
} from '../../constants/QuestionTypeContants.js'
import GreetingScreen from '../GreetingScreen'
import TextScreen from '../TextScreen'
import Mcq from '../Mcq'

@observer
class Questions extends React.Component {
   renderQuestions = () => {
      const { questions, onToggleShouldShowSettings,onClickQuestion,getQuestionNumber } = this.props
      return Array.from(questions.values()).map(each => {
         switch (each.questionType) {
            case WELCOME_SCREEN:
               return (
                  <GreetingScreen
                     key={each.questionId}
                     question={each}
                     onToggleShouldShowSettings={onToggleShouldShowSettings}
                     onClickQuestion={onClickQuestion}
                     
                  />
               )
            case THANK_YOU_SCREEN:
               return (
                  <GreetingScreen
                     key={each.questionId}
                     question={each}
                     onToggleShouldShowSettings={onToggleShouldShowSettings}
                     onClickQuestion={onClickQuestion}
                     
                  />
               )
            case SHORT_TEXT:
               return (
                  <TextScreen
                     key={each.questionId}
                     question={each}
                     onToggleShouldShowSettings={onToggleShouldShowSettings}
                     onClickQuestion={onClickQuestion}
                     getQuestionNumber={getQuestionNumber}
                  />
               )
            case LONG_TEXT:
               return (
                  <TextScreen
                     key={each.questionId}
                     question={each}
                     onToggleShouldShowSettings={onToggleShouldShowSettings}
                     onClickQuestion={onClickQuestion}
                     getQuestionNumber={getQuestionNumber}
                  />
               )
            case MULTIPLE_CHOICE:
               return (
                  <Mcq
                     key={each.questionId}
                     question={each}
                     onToggleShouldShowSettings={onToggleShouldShowSettings}
                     onClickQuestion={onClickQuestion}
                     getQuestionNumber={getQuestionNumber}
                  />
               )
         }
      })
   }

   render() {
      return this.renderQuestions()
   }
}

export { Questions }
