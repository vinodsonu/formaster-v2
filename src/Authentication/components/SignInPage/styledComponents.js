import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const LoginFormContainer = styled.div`
   ${tw`flex  justify-center`}
   background-color:#f1f7ff;
`

const LoginForm = styled.div`
   ${tw`flex flex-col items-center justify-center`}

   width: 536px;

   height: 687px;

   border-radius: 8px;

   background-color: #ffffff;
`

const WebTitle = styled.img`
   width: 90px;

   height: 90px;

   object-fit: contain;
`
const GreetingMessage = styled.span`
   width: 214px;

   height: 80px;

   font-family: Rubik;

   font-size: 32px;

   font-weight: normal;

   font-stretch: normal;

   font-style: normal;

   line-height: 1.25;

   letter-spacing: normal;

   color: #171f46;

   margin-bottom: 24px;

   text-align: center;
`

const ErrorMessage = styled.span`
   font-size: 16px;
   color: red;
`



export {
   LoginFormContainer,
   WebTitle,
   GreetingMessage,
   ErrorMessage,
   LoginForm
}
