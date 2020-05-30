import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const FormCard = styled.div`
   ${tw`flex flex-col shadow-md m-3`}
   width: 192px;
   height: 192px;
   border-radius: 4px;
   background-color: #ffffff;
   cursor: pointer;
`
export const FormTitle = styled.span`
   ${tw`h-4/5 flex justify-center items-center `}
   font-size: 16px;
   line-height: 24px;
   overflow: hidden;
   overflow-wrap: break-word;
   flex-grow: 1;
`
export const FormEditOptions = styled.button`
   ${tw`h-1/5 flex justify-center items-center m-3`}
   background-color: transparent;
   border: 1px solid transparent;
   border-radius: 4px;
   cursor: pointer;
   transition: all 0.4s ease 0s;
   padding: 0px;
   width: 28px;
`
