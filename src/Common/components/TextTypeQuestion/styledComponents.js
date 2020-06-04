import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import {
   thankyouIconButton
} from '../../themes/colors.js';

export const TextQuestion = styled.div`
   ${tw`flex items-center justify-start  flex-col `}
   height:300px;
`
export const QuestionNumber = styled.span`
   ${tw`flex items-center`}
`
export const QuestionDetails = styled.div`
   ${tw`flex  items-center`}
   font-size:20px;
   color:${thankyouIconButton}
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
`

export const QuestionText = styled.span`
   font-size: 30px;
`

export const QuestionResponse = styled.div`
   ${tw`ml-5`}
`
