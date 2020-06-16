import { validateUsername, validatePassword,validateConfirmPassword,validateName } from './ValidationUtils'

/*global expect*/

describe('Authentication Utils Test', () => {
   it('Should check for validateUsername fn', () => {
      expect(validateUsername('   ')).toBe(true)
      expect(validateUsername('username')).toBe(false)
   })

   it('Should check for validatePassword fn', () => {
      expect(validatePassword('')).toBe(true)
      expect(validatePassword('password')).toBe(false)
   })

   it("Should test confirm password with password",()=>{
      expect(validateConfirmPassword('password123','password123')).toBe(false);
      expect(validateConfirmPassword('password123','password12')).toBe(true);
   })

   it("Should test the name",()=>{
      expect(validateName('Muneera')).toBe(false);
      expect(validateName('   ')).toBe(true);
   })

})
