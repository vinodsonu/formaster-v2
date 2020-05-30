import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const McqScreen = styled.div`
   ${tw`flex flex-col justify-start`}
   padding: 24px 24px 64px 16px;
   font-size: 16px;
   line-height: 24px;
`
export const ScreenText = styled.div`
   ${tw`flex items-center justify-start`}
`
export const McqButton = styled.button`
   display: flex;
   -moz-box-align: center;
   align-items: center;
   border-radius: 4px;
   background-color: rgb(79, 169, 179);
   width: 52px;
   height: 24px;
   padding: 0px 6px;
   -moz-box-pack: justify;
   justify-content: space-between;
   cursor: pointer;
   margin-right: 10px;
`

export const EditOptions = styled.div`
   ${tw`flex justify-end items-center`}
`

export const DeleteButton = styled.button`
   ${tw``}
   border:none;
`

export const Qno = styled.span`
   color: white;
`

export const Choices = styled.div`
   ${tw`flex flex-col`}
`

export const AddMcqSection = styled.div`
   ${tw`flex`}
`
export const AddMcqButton = styled.div`
   ${tw`bg-white p-3 `}
   border-radius:50%;
`
