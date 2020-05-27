import FormsStore from './FormsStore';
import FormApiService from '../services/FormService/FormApi';
import FormFixtureService from '../services/FormService/FormFixture';

const isServerMode = false;
const formService = isServerMode ? new FormApiService():new FormFixtureService();

const formStore = new FormsStore(formService);

export {
    formStore
}
