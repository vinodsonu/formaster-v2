import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { thankyouIconButton } from '../../themes/colors.js'

export const McqQuestion = styled.div`
   ${tw`flex items-center justify-start`}
   font-size:30px;
   color: ${thankyouIconButton};
   padding: 10px;
`

export const QuestionText = styled.span`
   margin: 0px;
   max-width: 100%;
   font-weight: unset;
   font-size: 30px;
   line-height: 32px;
`
export const ChoiceWithChoiceText = styled.div`
   ${tw`flex items-center ml-5`}
   font-size:20px;
   color: ${thankyouIconButton};
   cursor: pointer;
   padding: 10px;
`
export const ChoiceCheckBox = styled.input``
export const ChoiceText = styled.span``
export const McqQuestionBody = styled.div`
   ${tw`flex flex-col items-start`}
`
export const QuestionNumber = styled.span`
   ${tw`flex items-center`}

   font-size:20px;
`

export const NextButton = styled.button`
   border: none;
   color: #ffffff;
   padding: 15px 32px;
   text-align: center;
   -webkit-transition-duration: 0.4s;
   transition-duration: 0.4s;
   margin: 16px 0 !important;
   text-decoration: none;
   font-size: 16px;
   cursor: pointer;
   background-color: #008cba;
   display: inline;
`
