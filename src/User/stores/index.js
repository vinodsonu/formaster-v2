import UserFormStore from './UserFormStore'
import FormService from '../services/FormService/FormApi'
import FormFixture from '../services/FormService/FormFixture'

const isServerResponce = false

const formService = isServerResponce
   ? new FormService()
   : new FormFixture()

const userFormStore = new UserFormStore(formService)

export default userFormStore
