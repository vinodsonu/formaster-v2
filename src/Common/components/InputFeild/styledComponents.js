import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const InputElement = styled.input`
   width: 320px;

   height: 40px;

   border-radius: 2px;

   border: solid 1px #7e858e;

   background-color: #ffffff;

   padding: 5px;

   padding-left: 10px;
`

const InputWithLabel = styled.div`
   ${tw`flex flex-col `}
   margin-bottom:30px;
`

const InputLabel = styled.span`
   font-size: 16px;
   line-height: 24px;
   color: rgb(38, 38, 39);
   margin-bottom: 10px;
`

export { InputElement, InputWithLabel, InputLabel }
