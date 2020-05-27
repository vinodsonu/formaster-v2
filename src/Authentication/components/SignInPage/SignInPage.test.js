import React from "react";
/*global expect*/
import { render } from "@testing-library/react";

import SignInPage from '.';

describe('Sign In Form',()=>{
   
   it('Should render typed username',()=>{
       
       const username = 'test-user';
       
       const {
           getByPlaceholderText
       } = render(
           
                <SignInPage username = {username} onChangeUsername = {()=>{}} />
           
           );
           
       const usernameField = getByPlaceholderText('muneeraShaik');
       
       expect(usernameField.value).toBe(username);
       
   });
   
   it('Should render typed password',()=>{
      
      const password = 'test-password';
      
      const {getByPlaceholderText} = render(
          <SignInPage password = {password} onChangePassword = {()=>{}} />
      );
      
      const passwordField = getByPlaceholderText('At least 8 charactors');
      
      expect(passwordField.value).toBe(password);
       
   });
   
   it('Should render Lgin Button',()=>{
     
      
      const {getByRole} = render(
          <SignInPage/>
      );
      
      const signInButton = getByRole("button", { name: "Log in to formaster" });
      
      expect(signInButton).toBeInTheDocument();
       
   });
   
//   it('Should render given error message',()=>{
       
//       const errorMessage = 'Invalid username';
       
//       const {getByText} = render(
           
//                 <SignInPage errorMessage={errorMessage} />
           
//           );
       
//       getByText(/Invalid username/i);
       
//   })
    
});