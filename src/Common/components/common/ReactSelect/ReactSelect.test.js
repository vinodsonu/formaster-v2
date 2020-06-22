import React from 'react';

import selectEvent from 'react-select-event'

import { render, fireEvent, getByText } from "@testing-library/react";
import ReactSelect from '.';


describe("test ReactSelect",()=>{
    it("test ReactSelect success",()=>{
        const {getByText,getByTestId} = render(
            <ReactSelect/>
        )

        
        getByText(/Yellow/)
        getByText(/Orange/)
        
    })

    // it("test ReactSelect click",async()=>{
    //     const {getByText,getByTestId} = render(
    //         <ReactSelect/>
    //     )

    //     fireEvent.click(getByTestId('colors'))
    //             getByText("hi")
    // })
})