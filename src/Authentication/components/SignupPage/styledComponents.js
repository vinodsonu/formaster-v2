import styled from '@emotion/styled'
import tw from 'tailwind.macro';

import {darkBlueGrey,brightBlue,iceBlue,white} from '../../themes/colors';


export const SignUpPageContainer = styled.div`
   ${tw`flex  justify-center`}
   background-color:${iceBlue};
`

export const SignUpPage = styled.div`
   ${tw`flex flex-col items-center justify-center`}

   width: 536px;


   border-radius: 8px;

   background-color:${white} ;
`

export const WebTitle = styled.img`
   width: 90px;

   height: 90px;

   object-fit: contain;
`
export const GreetingMessage = styled.span`
   width: 214px;

   height: 80px;

   font-family: Rubik;

   font-size: 32px;

   font-weight: normal;

   font-stretch: normal;

   font-style: normal;

   line-height: 1.25;

   letter-spacing: normal;

   color: ${darkBlueGrey};

   margin-bottom: 24px;

   text-align: center;
`

export const ErrorMessage = styled.span`
   font-size: 16px;
   color: red;
`

export const SignInFeild = styled.div`

   ${tw`flex justify-center items-center`}

   

  height: 24px;

  font-family: HKGrotesk;

  font-size: 14px;

  font-weight: normal;

  font-stretch: normal;

  font-style: normal;

  line-height: 1.71;

  letter-spacing: normal;

  color: ${darkBlueGrey};
  
  margin-top:32px;
  margin-bottom:32px;
`
export const SignInText = styled.span`


   
`

export const SignInLink = styled.a`
   color:${brightBlue};
   text-decoration:none;
   cursor:pointer;
`