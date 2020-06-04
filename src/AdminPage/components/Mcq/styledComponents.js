import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const McqScreen = styled.div`
   ${tw`flex flex-col items-start`}
   padding: 24px 24px 64px 16px;
   font-size: 16px;
   line-height: 24px;
`
export const ScreenText = styled.div`
   ${tw`flex items-center justify-start`}
`
export const Choices = styled.div`
   ${tw`flex flex-col`}
`

export const AddMcqSection = styled.div`
   ${tw`flex`}
`
export const AddMcqButton = styled.div`
   ${tw`bg-white p-3 `}
   border-radius:50%;
`
