import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const McqQuestion = styled.div`
   width: 100%;
   max-width: 840px;
   margin: 0px auto;
   padding-left: 70px;
   padding-right: 70px;
   
`

export const QuestionText = styled.span`
   margin: 0px;
   max-width: 100%;
   font-weight: unset;
   font-size: 24px;
   line-height: 32px;
   color: rgb(61, 61, 61);
`
export const ChoiceWithChoiceText = styled.div`
   ${tw`flex items-center`}

   color: rgb(79, 176, 174);
   cursor: pointer;
`
export const ChoiceCheckBox = styled.input``
export const ChoiceText = styled.span``
export const McqQuestionBody = styled.div`
   ${tw`flex flex-col items-center`}
`
export const QuestionNumber = styled.span``

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
