import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import strings from '../../i18n/strings.json'
import PreviewNavButton from '../common/PreviewNavButton';

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

   updateChoice = (event) =>{
      const {
         onChangeResponseChoice
      } = this.props.question;
      if(onChangeResponseChoice)
         onChangeResponseChoice(event.target.id)
   }

   renderMcqChoices = () => {
      const { responseChoice, choices } = this.props.question
      const { mcqTextQuestionType } = strings
      return choices.map(eachChoice => {
         let checked = false
         if (responseChoice == eachChoice.choice_id) checked = true
         const { choice_text } = eachChoice

         return (
            <ChoiceWithChoiceText
               key={eachChoice.choice_id}
               
            >
               <ChoiceCheckBox 
                  onClick={this.updateChoice} 
                  id={eachChoice.choice_id} 
                  type={mcqTextQuestionType}
                  checked={checked}
                  />
               <ChoiceText>{choice_text}</ChoiceText>
            </ChoiceWithChoiceText>
         )
      })
   }

   render() {
      const { question:{questionText,questionType}, 
      questionNumber,
      totalQuestions,
      questionPosition,
      questionResponseText,
      questionChoiceResponse
   } = this.props

   

      return (
         <McqQuestionBody>
            <QuestionNumber>{questionNumber}</QuestionNumber>
            <McqQuestion>
               <QuestionText>{questionText}</QuestionText>
               {this.renderMcqChoices()}
            </McqQuestion>
            <PreviewNavButton
              
               questionType = {questionType}
               questionNumber = {questionNumber}
               totalQuestions = {totalQuestions}
               handleOnClick = {this.getNextQuestion}
               questionResponseText = {questionResponseText}
               questionChoiceResponse = {questionChoiceResponse}
               questionPosition = {questionPosition}
              
              />
         </McqQuestionBody>
      )
   }
}

export { McqTypeQuestion }
