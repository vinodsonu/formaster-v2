import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const CreateFormCard = styled.div`
   ${tw`flex flex-col shadow-md m-3 text-white`}
   width: 192px;
   height: 192px;
   border-radius: 4px;
   background-color: #ffffff;
   background-color: #00b8e6;
   cursor: pointer;
`
export const CreateFormText = styled.span`
   ${tw`h-3/6 flex justify-center items-center `}
   font-size: 16px;
   line-height: 24px;
   z-index: 20;
   overflow: hidden;
   overflow-wrap: break-word;
   flex-grow: 1;
   cursor: pointer;
`
export const CreateFormButton = styled.button`
   ${tw`h-3/6 flex justify-center items-center m-3 shadow-md`}
   background-color: transparent;
   border: 1px solid transparent;
   border-radius: 4px;
   cursor: pointer;
   transition: all 0.4s ease 0s;
   padding: 0px;
   width: 40px;
   height: 40px;
   border-radius: 50%;
`
