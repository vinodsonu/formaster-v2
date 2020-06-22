import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import NoDataView from './';


describe("test NoDataView",()=>{
    it("should test NoData View",()=>{
        const {getByText} = render(<NoDataView/>)
        getByText(/No data found!/)
    })
})