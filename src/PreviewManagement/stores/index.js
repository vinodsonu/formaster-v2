import QuestionPreviewServiceApi from '../services/QuestionPreviewService/QuetionPreviewApi'
import QuestionPreviewServiceFixture from '../services/QuestionPreviewService/QuetionPreviewFixtures'
import PreviewStore from './PreviewStore'

const isServerCommunication = false

const questionService = isServerCommunication
   ? new QuestionPreviewServiceApi()
   : new QuestionPreviewServiceFixture()

const previewStore = new PreviewStore(questionService)

export { previewStore }
