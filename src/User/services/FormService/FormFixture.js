import formResponse from '../../fixtures/getFormResponse.json'
export default class FormFixtureService {
   
   getForms(limit,offset) {
      return new Promise((resolve) => {
            if(offset===0)
               setTimeout(()=>{resolve(formResponse[0])},1000)
            else if(offset===3)
            setTimeout(()=>{resolve(formResponse[1])},1000)
      })
   }
}
