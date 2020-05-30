import React from 'react'
import { observer } from 'mobx-react'
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { MdShortText } from 'react-icons/md'
import { BsTextCenter } from 'react-icons/bs'

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
   renderIconButton = () => {
      const { questionType, questionId } = this.props.question
      return questionType === 'SHORT_TEXT' ? (
         <ShortButton>
            <MdShortText />
            <Qno></Qno>
         </ShortButton>
      ) : (
         <LongButton>
            <BsTextCenter />
            <Qno></Qno>
         </LongButton>
      )
   }

   handleOnChange = event => {
      const { onChangeQuestionText } = this.props.question
      onChangeQuestionText(event.target.value)
   }

   render() {
      const {
         createRoute: {
            shortTextScreen: { placeholder, type }
         }
      } = strings
      const { questionText, questionId } = this.props.question
      return (
         <TextScreenContainer>
            <ScreenText>
               {this.renderIconButton()}
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
         </TextScreenContainer>
      )
   }
}

export { TextScreen }
