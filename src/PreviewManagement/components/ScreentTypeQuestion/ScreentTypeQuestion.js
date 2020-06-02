import React from 'react'
import {FaRegImage} from 'react-icons/fa'

import strings from '../../i18n/strings.json'

import { ScreenQuestion, ScreenText, StartButton,ImageContainer } from './styledComponents.js'

class ScreentTypeQuestion extends React.Component {
   getNextQuestion = () => {
      const { getNextQuestion ,getPreviousQuestion} = this.props
      getNextQuestion()
   }

   render() {
      const {
         question: { questionText }
      } = this.props
      const { startButtonText } = strings
      return (
         <ScreenQuestion>
            <ImageContainer>
               <FaRegImage/>
            </ImageContainer>
            <ScreenText>{questionText}</ScreenText>
            <StartButton onClick={this.getNextQuestion}>
               {startButtonText}
            </StartButton>
         </ScreenQuestion>
      )
   }
}

export { ScreentTypeQuestion }
