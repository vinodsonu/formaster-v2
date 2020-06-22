import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Modal from '.';


describe("test ReactModal",()=>{
    it("test Model success",()=>{
        const {getByText,getByTestId} = render(
            <Modal/>
        )

        fireEvent.click(getByTestId("mini-modal"))
        getByText(/Delete Your Account/)
        // fireEvent.blur(getByTestId("modal-body"))
        // getByText(/Hi/)
        
    })
})