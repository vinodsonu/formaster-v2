import React from 'react'
import { observer } from 'mobx-react'

import QuestionEditOptions from '../common/QuestionEditOptions'
import QuestionIcon from '../common/QuestionIcon'
import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import strings from '../../i18n/strings.json'

import {
   TextScreenContainer,
   ScreenText,
   LongButton,
   ShortButton,
   EditOptions,
   DeleteButton,
   Qno
} from './styledComponents.js'

@observer
class TextScreen extends React.Component {
   

   handleOnChange = event => {
      const { onChangeQuestionText } = this.props.question
      onChangeQuestionText(event.target.value)
   }

   onFocusQuestion = () =>{
      const {
         onClickQuestion,
         question:{questionId}
      } = this.props;
      onClickQuestion(questionId)
   }

   render() {
      const {
         createRoute: {
            shortTextScreen: { placeholder, type }
         }
      } = strings
      const { 
         question:{questionText, questionId,questionType},
         getQuestionNumber,
         onDeleteQuestion
      } = this.props
      const questionNumber = getQuestionNumber(questionId)
      return (
         <TextScreenContainer onClick = {this.onFocusQuestion}>
            <ScreenText>
               <QuestionIcon
                  type={questionType}
                  questionNumber={questionNumber}
               />
               <TransparentInputFeild
                  placeholder={placeholder}
                  handleOnChange={this.handleOnChange}
                  value={questionText}
                  type={type}
                  handleOnFocus = {()=>{}}
               />
            </ScreenText>
            <QuestionEditOptions
               onDeleteQuestion={onDeleteQuestion}
               questionId = {questionId}
            />
         </TextScreenContainer>
      )
   }
}

export { TextScreen }
