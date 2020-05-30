import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const UserProfile = styled.div`
   ${tw`flex flex-col`}
`

export const ProfileName = styled.span`
   display: flex;
   -moz-box-align: center;
   align-items: center;
   cursor: pointer;
`

export const ProfilePic = styled.span`
   height: 40px;
   width: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   background-color: green;
   color: white;
   font-sixe: 20px;
   margin: 3px;
`

export const Username = styled.span`
   display: block;
   font-size: 14px;
   line-height: 20px;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   margin-right: 8px;
`

export const ProfileAndLogout = styled.div`
   ${tw`flex flex-col shadow-md bg-white`}
   position:fixed;
   margin-top: 50px;
`

export const LogoutButton = styled.button`
   display: block;
   font-size: 14px;
   line-height: 20px;
   color: rgb(217, 87, 103);
   cursor: pointer;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
`
