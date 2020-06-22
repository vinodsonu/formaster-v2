import {isLoggedin} from './AccessTokenUtills';

describe("test AccessTokenUtills",()=>{
    it("test isLoggedin",()=>{
        expect(isLoggedin()).toBe(false)
    })
})