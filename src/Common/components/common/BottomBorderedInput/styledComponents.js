import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {thankyouIconButton} from '../../../themes/colors.js';

const InputElement = styled.input`
    ${tw`flex flex-wrap`}
   font-size: 26px;
   color:${thankyouIconButton};
   border-bottom:3px solid ${thankyouIconButton};
   background:transparent;
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
