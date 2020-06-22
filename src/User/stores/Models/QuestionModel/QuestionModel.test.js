import QuestionModel from './';
import getPreviewDetails from '../../../fixtures/getPreviewDetails.json'

describe('Test QuestionModel',()=>{
    let textQModel;
    beforeEach(()=>{
        textQModel = new QuestionModel(getPreviewDetails[1].question);
    })
    it('should test QuestionModel initialization',()=>{
        expect(textQModel.questionId).toBe(1);
        expect(textQModel.questionType).toBe("SHORT_TEXT");
        expect(textQModel.questionText).toBe("What is your first name ?")
        expect(textQModel.required).toBe(true);
        expect(textQModel.description).toBe("Enter your first name")
        expect(textQModel.imageUrl).toBe('./');
    })
})