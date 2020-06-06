import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import endpoints from '../endpoints'
import {BASE_URL} from '../../../Common/constants/UrlConstants';

export default class FormApiService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   getForms(limit,offset) {
      return networkCallWithApisauce(
         this.api,
         `/admin_forms/v1/?limit=${limit}&offset=${offset}`,
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
            form_name:form_name
         },
         apiMethods.put
      )

   }

   deleteForm(formId){
      const {
         deleteForm
      } = endpoints
      const endpoint = `${deleteForm[0]}${formId}/v1/`
      return networkCallWithApisauce(
         this.api,
         endpoint,
         {},
         apiMethods.delete
      )
   }

   

}
