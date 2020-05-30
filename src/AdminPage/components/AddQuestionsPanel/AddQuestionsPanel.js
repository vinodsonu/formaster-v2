import React from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import Questions from '../Questions'
import withToggle from '../../hocs/withToggle'

import {
   AddQuestion,
   AddButtonWithText,
   AddButton,
   AddText,
   AddWithTypes,
   TypeOptions,
   Option
} from './styledComponents.js'

@observer
class AddQuestionsPanel extends React.Component {
   renderListOfQuestions = () => {
      const { questions, onToggleShouldShowSettings } = this.props
      return (
         <Questions
            questions={questions}
            onToggleShouldShowSettings={onToggleShouldShowSettings}
         />
      )
   }

   renderTypeOptions = () => {
      const {
         createRoute: { questionTypeOptions }
      } = strings
      const { toggleStatus, onToggle, addNewQuestion } = this.props
      return toggleStatus ? (
         <TypeOptions>
            <Option value={questionTypeOptions[0]} onClick={addNewQuestion}>
               {questionTypeOptions[0]}
            </Option>
            <Option value={questionTypeOptions[1]} onClick={addNewQuestion}>
               {questionTypeOptions[1]}
            </Option>
            <Option value={questionTypeOptions[2]} onClick={addNewQuestion}>
               {questionTypeOptions[2]}
            </Option>
            <Option value={questionTypeOptions[3]} onClick={addNewQuestion}>
               {questionTypeOptions[3]}
            </Option>
            <Option value={questionTypeOptions[4]} onClick={addNewQuestion}>
               {questionTypeOptions[4]}
            </Option>
         </TypeOptions>
      ) : null
   }

   renderAddQuestionSection = () => {
      const {
         createRoute: {
            createPageBody: { createQuestionButtonText, addNewQuestionText },
            questionTypeOptions
         }
      } = strings
      const { onToggle } = this.props

      return (
         <AddButtonWithText>
            <AddWithTypes>
               <AddButton onClick={onToggle}>
                  {createQuestionButtonText}
               </AddButton>
               {this.renderTypeOptions()}
            </AddWithTypes>
            <AddText></AddText>
         </AddButtonWithText>
      )
   }

   render() {
      return (
         <AddQuestion data-testid='list-of-questions'>
            {this.renderListOfQuestions()}
            {this.renderAddQuestionSection()}
         </AddQuestion>
      )
   }
}

export default withToggle(AddQuestionsPanel)
