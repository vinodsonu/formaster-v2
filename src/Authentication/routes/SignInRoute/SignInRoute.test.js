import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

/*global jest*/
/*global expect*/

import {
  SIGN_IN_PATH,
  PRODUCTS_PAGE_PATH
} from "../../constants/RouteConstants";

import AuthAPI from "../../services/AuthService/AuthAPI";
import AuthStore from "../../stores/AuthStore";
import getUserSignInResponse from "../../services/AuthService/AuthFixture";

import SignInRoute from ".";

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

describe('SignInRoute test',()=>{
   
   let authAPI;
   let authStore;
   
   beforeEach(()=>{
      
      authAPI = new AuthAPI();
      authStore = new AuthStore(authAPI);
      
       
   });
   
   afterEach(()=>{
      
        jest.resetAllMocks();
       
   });
   
   it('Should render username empty error message',()=>{
      
      const {
          getByText,
          getByRole
      } = render(
          
          <Router history={createMemoryHistory()}>
                <SignInRoute authStore={authStore} />
          </Router>
          
          );
          
      const signInButton = getByRole('button',{name:'Sign In'});
      
      fireEvent.click(signInButton);
      
      getByText(/Please enter username/i);
       
   });
   
   
   it("should render password empty error message", () => {
    
    const { getByText, getByPlaceholderText, getByRole } = render(
      
      <Router history={createMemoryHistory()}>
        <SignInRoute authStore={authStore} />
      </Router>
    );
    
    const username = "test-user";
    const usernameField = getByPlaceholderText("Username");
    const signInButton = getByRole("button", { name: "Sign In" });

    fireEvent.change(usernameField, { target: { value: username } });
    fireEvent.click(signInButton);

    getByText(/Please enter password/i);
  });
  
  
  it("should submit sign-in on press enter", () => {
    
    const { getByLabelText, getByPlaceholderText, getByRole,getByText } = render(
      <Router history={createMemoryHistory()}>
        <SignInRoute authStore={authStore} />
      </Router>
    );
    const username = "test-user";
    const password = "test-password";

    const usernameField = getByPlaceholderText("Username");
    const passwordField = getByPlaceholderText("Password");

    fireEvent.change(usernameField, { target: { value: username } });
    fireEvent.change(passwordField, { target: { value: password } });
    
    
    });
    
    
    it('Should render SignInRoute succes state',async()=>{
       
       const history = createMemoryHistory();
       
       const route = SIGN_IN_PATH;
       
       history.push(route);;
       
       const {
              getByPlaceholderText,
              getByRole,
              queryByRole,
              getByTestId
            } = render(
              <Provider authStore={authStore}>
                <Router history={history}>
                  <Route path={SIGN_IN_PATH}>
                    <SignInRoute />
                  </Route>
                  <Route path={PRODUCTS_PAGE_PATH}>
                    <LocationDisplay />
                  </Route>
                </Router>
              </Provider>
            );
            
        const username = "test-user";
        const password = "test-password";
        
        const usernameField = getByPlaceholderText("Username");
        const passwordField = getByPlaceholderText("Password");
        const signInButton = getByRole("button", { name: "Sign In" });
        
        const mockSuccessPromise = new Promise(function(resolve, reject) {
          resolve(getUserSignInResponse);
        });
        
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockSuccessPromise);
        
        authAPI.getAuth = mockSignInAPI;
        
        fireEvent.change(usernameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });
        fireEvent.click(signInButton);
        
        
       await waitFor(() => {
              expect(
                queryByRole("button", { name: "Sign In" })
              ).not.toBeInTheDocument();
              expect(getByTestId("location-display")).toHaveTextContent(
                PRODUCTS_PAGE_PATH
              );
              
        });
        
        
        });
        
        
        
        it("should render signInRoute failure state", () => {
    
                const { getByText, getByPlaceholderText, getByRole } = render(
                  <Router history={createMemoryHistory()}>
                    
                    <SignInRoute authStore={authStore} />
                  </Router>
                );
            
                const username = "test-user";
                const password = "test-password";
            
                const usernameField = getByPlaceholderText("Username");
                const passwordField = getByPlaceholderText("Password");
                const signInButton = getByRole("button", { name: "Sign In" });
            
                const mockFailurePromise = new Promise(function(resolve, reject) {
                  reject(new Error("error"));
                }).catch(() => {});
  
                const mockSignInAPI = jest.fn();
                mockSignInAPI.mockReturnValue(mockFailurePromise);
                authAPI.signInAPI = mockSignInAPI;
            
                fireEvent.change(usernameField, { target: { value: username } });
                fireEvent.change(passwordField, { target: { value: password } });
                fireEvent.click(signInButton);
            
                waitFor(() => {
                  getByText(/server-error/i);
                });
                
        });
    
});