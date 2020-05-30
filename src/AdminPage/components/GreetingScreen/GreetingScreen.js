import React from 'react'
import { observer } from 'mobx-react'
import { GiSpotedFlower } from 'react-icons/gi'
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import strings from '../../i18n/strings.json'
import welcomeScreen from '../icons/welcomeScreen.svg'
import settings from '../icons/settings.svg'

import {
   GreetingsFeild,
   ScreenText,
   ThankYouButton,
   Icon,
   EditOptions,
   SettingsIcon,
   DeleteButton,
   WelcomeButton
} from './styledComponents.js'

@observer
class GreetingScreen extends React.Component {
   handleOnChange = event => {
      const { question } = this.props

      question.onChangeQuestionText(event.target.value)
   }

   onToggleShouldShowSettings = () => {
      const { onToggleShouldShowSettings, question } = this.props

      onToggleShouldShowSettings(question)
   }

   renderTheThankYouScrren = () => {
      const {
         createRoute: {
            thankYouScreen: { placeholder, type }
         }
      } = strings
      const { questionId, questionText } = this.props.question

      return (
         <GreetingsFeild>
            <ScreenText>
               <ThankYouButton>
                  <GiSpotedFlower />
               </ThankYouButton>
               <TransparentInputFeild
                  placeholder={placeholder}
                  handleOnChange={this.handleOnChange}
                  value={questionText}
                  type={type}
               />
            </ScreenText>
            <EditOptions>
               <AiTwotoneSetting />
               <DeleteButton onClick={() => {}} id={questionId}>
                  <AiFillDelete />
               </DeleteButton>
            </EditOptions>
         </GreetingsFeild>
      )
   }

   renderTheWelcomeScrren = () => {
      const {
         createRoute: {
            welcomeScreen: { placeholder, type }
         }
      } = strings
      const { questionText, questionId } = this.props.question
      return (
         <GreetingsFeild>
            <ScreenText>
               <WelcomeButton>
                  <GiSpotedFlower />
               </WelcomeButton>
               <TransparentInputFeild
                  placeholder={placeholder}
                  handleOnChange={this.handleOnChange}
                  value={questionText}
                  type={type}
               />
            </ScreenText>
            <EditOptions>
               <AiTwotoneSetting />
               <DeleteButton id={questionId}>
                  <AiFillDelete />
               </DeleteButton>
            </EditOptions>
         </GreetingsFeild>
      )
   }

   render() {
      const { questionType } = this.props.question
      return questionType === 'WELCOME_SCREEN'
         ? this.renderTheWelcomeScrren()
         : this.renderTheThankYouScrren()
   }
}

export { GreetingScreen }
