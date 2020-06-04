import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const InputElement = styled.input`
   font-size: 16px;
   background: transparent;
`

const InputWithLabel = styled.div`
   ${tw`flex flex-col flex-wrap mt-2 mb-2`}
   flex-grow:1;
`

const InputLabel = styled.span`
   font-size: 16px;
   line-height: 24px;
   margin-left: 10px;
`

export { InputElement, InputWithLabel, InputLabel }
