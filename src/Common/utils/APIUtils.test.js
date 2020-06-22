import {
    networkCallWithApisauce,
    getUserDisplayableErrorMessage
} from './APIUtils'

describe("test APIUtils",()=>{

    it("test networkCallWithApisauce",()=>{
        console.log("APIUtils...",networkCallWithApisauce())
    })

    it("test getUserDisplayableErrorMessage",()=>{
        expect(getUserDisplayableErrorMessage(new Error("error"))).toBe("We're having some trouble completing your request. Please try again.")
    })


})


