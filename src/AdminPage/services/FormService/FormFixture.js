import formResponse from '../../fixtures/getFormResponse.json'

export default class FormFixtureService {
   getForms() {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(formResponse)
         }, 2000)
      })
   }

   createNewForm(formName) {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve({
               form_id: '10',
               form_name: 'Request Form'
            })
            // reject();
         }, 2000)
      })
   }

   updateFormName(form){
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 2000)
      })
   }

   deleteForm(formId){
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 2000)
      })
   }
}
