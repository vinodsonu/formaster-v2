import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import strings from '../../i18n/strings.json'

import {
   McqQuestion,
   QuestionText,
   ChoiceWithChoiceText,
   ChoiceCheckBox,
   ChoiceText,
   McqQuestionBody,
   QuestionNumber,
   NextButton
} from './styledComponents.js'

@observer
class McqTypeQuestion extends React.Component {
   renderMcqChoices = () => {
      const { responseChoice, choices } = this.props.question
      const { mcqTextQuestionType } = strings
      return choices.map(eachChoice => {
         const checked = false
         if (responseChoice === eachChoice.choice_id) checked = true
         const { choice_text } = eachChoice

         return (
            <ChoiceWithChoiceText
               key={eachChoice.choice_id}
               id={eachChoice.choice_id}
            >
               <ChoiceCheckBox type={mcqTextQuestionType} checked={checked}/>
               <ChoiceText>{choice_text}</ChoiceText>
            </ChoiceWithChoiceText>
         )
      })
   }

   render() {
      const { questionText, questionNumber } = this.props.question

      const { getNextQuestion } = this.props

      const { nextButtonText } = strings

      return (
         <McqQuestionBody>
            <QuestionNumber>{questionNumber}</QuestionNumber>
            <McqQuestion>
               <QuestionText>{questionText}</QuestionText>
               {this.renderMcqChoices()}
            </McqQuestion>
            <NextButton onClick={getNextQuestion}>{nextButtonText}</NextButton>
         </McqQuestionBody>
      )
   }
}

export { McqTypeQuestion }
