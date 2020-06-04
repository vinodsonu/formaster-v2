import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const TextQuestion = styled.div`
   ${tw`flex items-start flex-col`}
`
export const QuestionNumber = styled.span`
   ${tw``}
`
export const QuestionDetails = styled.div`
   ${tw`flex flex-col items-center`}
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
   font-size: 24px;
`

export const QuestionResponse = styled.div``
