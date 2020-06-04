import AuthStore from './AuthStore'
import AuthService from '../services/AuthService/AuthAPI'
import AuthServiceFixture from '../services/AuthService/AuthFixture'
import UserProfileService from '../services/UserProfileService/UserProfileAPI'
import UserProfileFixture from '../services/UserProfileService/UserProfileFixture'

const isServerResponce = true;

const authService = isServerResponce
   ? new AuthService()
   : new AuthServiceFixture()
const userProfileService = isServerResponce
   ? new UserProfileFixture()
   : new UserProfileFixture()

const authStore = new AuthStore(authService, userProfileService)

export default authStore
