import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'

export default class FormApiService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }

   getForms(access_token) {
      return networkCallWithApisauce(
         this.api,
         endpoints.forms,
         {},
         apiMethods.get
      )
   }

   createNewForm(formName) {
      return networkCallWithApisauce(
         this.api,
         endpoints.createForm,
         {
            form_name:formName
         },
         apiMethods.post
      )
   }

   updateFormName(form){
      const {
         form_id,
         form_name
      } = form;
      const {
         updateFormName
      } = endpoints
      const endpoint = `${updateFormName[0]}${form_id}${updateFormName[1]}`;

      return networkCallWithApisauce(
         this.api,
         endpoint,
         {
            form_name:formName
         },
         apiMethods.put
      )

   }

   deleteForm(formId){
      const {
         deleteForm
      } = endpoints
      const endpoint = `${deleteForm[0]}${formId}`
      return networkCallWithApisauce(
         this.api,
         endpoint,
         {},
         apiMethods.delete
      )
   }

   

}
