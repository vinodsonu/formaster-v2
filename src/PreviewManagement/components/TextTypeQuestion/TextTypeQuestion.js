import React from 'react'
import { observer } from 'mobx-react'

import InputFeild from '../../../Common/components/InputFeild'
import strings from '../../i18n/strings.json'

import {
   TextQuestion,
   QuestionNumber,
   QuestionDetails,
   NextButton,
   QuestionText,
   QuestionResponseFeild
} from './styledComponents.js'

@observer
class TextTypeQuestion extends React.Component {
   handleQuestionResponse = event => {
      const { question } = this.props
      question.onChangeResponseText(event.target.value)
   }

   getNextQuestion = () => {
      const { getNextQuestion } = this.props
      getNextQuestion()
   }

   render() {
      const {
         question,
         questionNumber,
         question: { questionText, textResponseDetails }
      } = this.props

      const { QuestionPlaceholder, nextButtonText } = strings

      return (
         <TextQuestion>
            <QuestionNumber>{questionNumber}</QuestionNumber>
            <QuestionDetails>
               <ImageConatiner>
                  
               </ImageConatiner>
               <QuestionText>{questionText}</QuestionText>
               <QuestionResponseFeild>
                  <InputFeild
                     value={textResponseDetails}
                     placeholder={QuestionPlaceholder}
                     handleOnChange={this.handleQuestionResponse}
                  />
               </QuestionResponseFeild>
               <NextButton onClick={this.getNextQuestion}>
                  {nextButtonText}
               </NextButton>
            </QuestionDetails>
         </TextQuestion>
      )
   }
}

export { TextTypeQuestion }
