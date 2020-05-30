import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const TextScreenContainer = styled.div`
   ${tw`flex flex-col`}
   padding: 24px 24px 64px 16px;
   font-size: 16px;
   line-height: 24px;
   height: 100px;
`
export const ScreenText = styled.div`
   ${tw`flex items-center justify-start`}
`
export const ShortButton = styled.button`
   display: flex;
   -moz-box-align: center;
   align-items: center;
   border-radius: 4px;
   background-color: rgb(255, 186, 73);
   width: 52px;
   height: 24px;
   padding: 0px 6px;
   -moz-box-pack: justify;
   justify-content: space-between;
   cursor: pointer;
   margin-right: 10px;
`
export const Icon = styled.img``
export const EditOptions = styled.div`
   ${tw`flex justify-end items-center`}
`
export const SettingsIcon = styled.img`
   width: 20px;
   height: 20px;
   color: red;
   font-size: 20px;
`
export const DeleteButton = styled.button`
   ${tw``}
   border:none;
`

export const LongButton = styled.button`
   display: flex;
   -moz-box-align: center;
   align-items: center;
   border-radius: 4px;
   background-color: rgb(226, 109, 90);
   width: 52px;
   height: 24px;
   padding: 0px 6px;
   -moz-box-pack: justify;
   justify-content: space-between;
   cursor: pointer;
   margin-right: 10px;
`

export const Qno = styled.span`
   color: white;
`
