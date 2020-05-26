import {
    validateUsername,
    validatePassword
} from './ValidationUtils';

/*global expect*/

describe('Authentication Utils Test',()=>{
    
    it('Should check for validateUsername fn',()=>{
        expect(validateUsername('')).toBe(true);
        expect(validateUsername('username')).toBe(false);
    });
    
    it('Should check for validatePassword fn',()=>{
       expect(validatePassword('')).toBe(true);
       expect(validatePassword('password')).toBe(false);
    });
})