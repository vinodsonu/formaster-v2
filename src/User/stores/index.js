import UserFormStore from './UserFormStore'
import FormService from '../services/FormService/FormApi'
import FormFixture from '../services/FormService/FormFixture'
import QuestionPreviewServiceApi from '../services/QuestionPreviewService/QuetionPreviewApi'
import QuestionPreviewServiceFixture from '../services/QuestionPreviewService/QuetionPreviewFixtures'
import PreviewStore from './PreviewStore'

const isServerCommunication = true;

const questionService = isServerCommunication
   ? new QuestionPreviewServiceApi()
   : new QuestionPreviewServiceFixture()

const previewStore = new PreviewStore(questionService)


const isServerResponce = true

const formService = isServerResponce
   ? new FormService()
   : new FormFixture()

const userFormStore = new UserFormStore(formService)

export  {
   userFormStore,
   previewStore
}
