import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const PreviewPageContainer = styled.div`
   ${tw`flex flex-col justify-center items-center h-screen`}
  
   
   
`
export const ProgressBarAndQuestionNavigator = styled.div`

   ${tw`flex justify-between  items-center `}
   height:100px;
   position:relative;
   bottom:0;
   width:auto;



`

export const Navigator = styled.div`
   ${tw`flex justify-center items-center text-white`}
`
export const TopNavigator = styled.button`

   width:25px;
   height:25px;
   ${tw`flex justify-center items-center`}
   background-color: rgb(79, 176, 174);
   &:hover{
      opacity:0.9
   }
   &:disabled{
      opacity:0.8;
      cursor: not-allowed;
   }

`
export const BottomNavigator = styled.button`

width:25px;
height:25px;
${tw`flex justify-center items-center`}
background-color: rgb(79, 176, 174);
&:hover{
   opacity:0.9
}
&:disabled{
   opacity:0.8;
   cursor: not-allowed;
}
`

export const ProgBar = styled.div`${tw`w-64 flex flex-col items-center justify-center mr-3`}`

export const Lable = styled.span`${tw``}`;