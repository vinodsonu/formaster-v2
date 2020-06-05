import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import {
   thankyouIconButton
} from '../../themes/colors.js';

export const ScreenQuestion = styled.div`
   ${tw`flex flex-col items-center`}
   height:300px;
   
`
export const ScreenText = styled.span`
   font-size: 30px;
   color:${thankyouIconButton};
`
export const StartButton = styled.button`
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

export const ImageContainer = styled.span`

width: 270px;
height: 200px;
max-width: 100%;
display: flex;
flex-direction: column;
-moz-box-align: center;
align-items: center;
-moz-box-pack: center;
justify-content: center;
margin: 0px auto;
background-color: rgba(79, 176, 174, 0.2);

`
