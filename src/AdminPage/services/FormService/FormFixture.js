import formResponse from '../../fixtures/getFormResponse.json';

export default class FormFixtureService{
    

    getForms(){
        return new Promise((resolve,reject)=>{
            resolve(formResponse);
        })
    
    }
    
}