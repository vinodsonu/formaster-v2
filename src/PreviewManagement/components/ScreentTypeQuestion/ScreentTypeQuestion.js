import React from 'react'
import strings from '../../i18n/strings.json'

import { ScreenQuestion, ScreenText, StartButton } from './styledComponents.js'

class ScreentTypeQuestion extends React.Component {
   getNextQuestion = () => {
      const { getNextQuestion } = this.props
      getNextQuestion()
   }

   render() {
      const {
         question: { questionText }
      } = this.props
      const { startButtonText } = strings
      return (
         <ScreenQuestion>
            <ScreenText>{questionText}</ScreenText>
            <StartButton onClick={this.getNextQuestion}>
               {startButtonText}
            </StartButton>
         </ScreenQuestion>
      )
   }
}

export { ScreentTypeQuestion }
