import signInAPIResponse from '../../fixtures/signInAPIResponse.json'

export default class AuthFixtureService {
   getAuth(authDetails) {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(signInAPIResponse)
         }, 1000)
      })
   }
}
