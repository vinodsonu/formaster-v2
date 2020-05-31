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
   
   &:focus {
    border-color:blue;
  }
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

const ErrorDisplay = styled.span`


  height: 16px;

  font-family: HKGrotesk;

  font-size: 12px;

  font-weight: normal;

  font-stretch: normal;

  font-style: normal;

  line-height: 1.33;

  letter-spacing: normal;

  color: #ff0b37;
  
  margin-top:5px;

`

export { InputElement, InputWithLabel, InputLabel,ErrorDisplay }


