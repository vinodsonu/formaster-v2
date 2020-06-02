import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'

import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import strings from '../../i18n/strings.json'

import {
   McqScreen,
   ScreenText,
   EditOptions,
   DeleteButton,
   McqButton,
   Qno,
   Choices,
   AddMcqSection,
   AddMcqButton
} from './styledComponents.js'

@observer
class Mcq extends React.Component {
   @observable choiceText = ''
   choiceCount = -1
   handleOnChange = event => {
      const { onChangeQuestionText } = this.props.question
      onChangeQuestionText(event.target.value)
   }

   handleMcqChange = event => {
      this.choiceText = event.target.value
   }

   onClickQuestion = () =>{
      const {
         onClickQuestion,
         question:{questionId}
      } = this.props;
      onClickQuestion(questionId)
   }

   renderChoices = () => {
      const { choices } = this.props.question
      const {
         createRoute: {
            mcqscreen: { choicePlaceholder, choiceType }
         }
      } = strings
      return choices.map(each => {
         return (
            <TransparentInputFeild
               placeholder={choicePlaceholder}
               handleOnChange={this.handleMcqChange}
               value={each.choice_text}
               type={choiceType}
               key={each.choice_id}
            />
         )
      })
   }

   addMcqButton = () => {}

   addMcq = () => {
      const { choices } = this.props.question
      let newChoices = choices
      newChoices.push({
         choice_id: this.choiceCount--,
         choice_text: this.choiceText
      })
      this.props.question.onChangeChoices(newChoices)
      this.choiceText = ''
   }

   render() {
      const {
         createRoute: {
            mcqscreen: { placeholder, type }
         }
      } = strings
      const { questionText, questionId } = this.props.question
      return (
         <McqScreen onClick={this.onClickQuestion}>
            <ScreenText>
               <McqButton>
                  <FaCheck />
                  <Qno></Qno>
               </McqButton>
               <Choices>
                  <TransparentInputFeild
                     placeholder={placeholder}
                     handleOnChange={this.handleOnChange}
                     value={questionText}
                     type={type}
                  />

                  {this.renderChoices()}
                  <AddMcqSection>
                     <AddMcqButton onClick={this.addMcq}>+</AddMcqButton>
                     <TransparentInputFeild
                        placeholder={placeholder}
                        handleOnChange={this.handleMcqChange}
                        value={this.choiceText}
                        type={type}
                     />
                  </AddMcqSection>
               </Choices>
            </ScreenText>
            <EditOptions>
               <AiTwotoneSetting />
               <DeleteButton id={questionId}>
                  <AiFillDelete />
               </DeleteButton>
            </EditOptions>
         </McqScreen>
      )
   }
}

export { Mcq }
