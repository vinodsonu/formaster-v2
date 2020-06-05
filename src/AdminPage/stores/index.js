import FormsStore from './FormsStore'
import FormApiService from '../services/FormService/FormApi'
import FormFixtureService from '../services/FormService/FormFixture'
import QuestionApiService from '../services/QuestionService/QuesttionApi'
import QuestionFixtureService from '../services/QuestionService/QuestionFixture'
import QuestionsStore from './QuestionsStore'

const isServerMode = true;
const formService = isServerMode
   ? new FormApiService()
   : new FormFixtureService()
const questionService = isServerMode
   ? new QuestionApiService()
   : new QuestionFixtureService()

const questionsStore = new QuestionsStore(questionService)
const formStore = new FormsStore(formService, questionsStore)

export { formStore, questionsStore }
