import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const AddQuestion = styled.div`
   ${tw`flex flex-col`}
   max-height:100vh;
   overflow: scroll;
   flex: 1 1 0;
   margin-top: 64px;
   min-width:500px;
`
export const BottomDiv = styled.div``

export const AddButtonWithText = styled.div`
   ${tw`flex items-start justify-center`}
`
export const AddButton = styled.button`
   padding: 10px;
   margin: 10px;
   border-radius: 100%;
   color: white;
   background-color: black;
`
export const AddText = styled.span``

export const AddWithTypes = styled.div`
   ${tw`flex flex-col items-center`}
`
export const TypeOptions = styled.div`
   ${tw`flex flex-col bg-white shadow-md p-3`}
`
export const Option = styled.button`
   ${tw``}
   width:100%;
   height:100%;
   
   &:hover{
      
   }
`
