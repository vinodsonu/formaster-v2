import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const PrimaryButtonElement = styled.button`
   ${tw`flex items-center justify-center`}
   width: 320px;
   padding: 10px;
   border-radius: 4px;

   background-color: #0b69ff;
`

const ButtonText = styled.span`
   height: 24px;

   font-family: Rubik;

   font-size: 18px;

   font-weight: 500;

   font-stretch: normal;

   font-style: normal;

   line-height: 1.71;

   letter-spacing: normal;

   color: #ffffff;
`

export { PrimaryButtonElement, ButtonText }
