import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const NavBarHeader = styled.div`
   ${tw`bg-white shadow-md fixed`}
   display: flex;
   -moz-box-align: center;
   align-items: center;
   width: 100%;
   min-height: 64px;
   top: 0;
`
export const FormNameAndBackNavigation = styled.div`
   display: flex;
   flex-flow: row nowrap;
   -moz-box-align: center;
   align-items: center;
   flex-grow: 1;
`
export const BackButton = styled.button`
   ${tw` w-auto h-auto m-3  `}
   padding:5px;
`
export const BackIcon = styled.img`
   height: 200px;
   width: 200px;
   background-color: red;
`
export const NavLinks = styled.ul`
   display: flex;
   margin: 0px;
   padding: 0px;
   list-style-type: none;
`
export const EachLink = styled.li`
   flex: 1 1 0;
   cursor: pointer;
`

export const PublishButtonAndProfile = styled.div`
   ${tw`flex mr-5`}
`
