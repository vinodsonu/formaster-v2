import getUserProfileResponse from '../../fixtures/getUserProfileResponse.json'

export default class userProfileService {
   getUserProfile() {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(getUserProfileResponse)
            // reject();
         }, 2000)
      })
   }
}
