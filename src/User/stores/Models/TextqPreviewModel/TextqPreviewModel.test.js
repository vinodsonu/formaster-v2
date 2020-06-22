import TextqPreviewModel from './';
import getPreviewDetails from '../../../fixtures/getPreviewDetails.json'

describe('Test TextqPreviewModel',()=>{
    let textQModel;
    beforeEach(()=>{
        textQModel = new TextqPreviewModel(getPreviewDetails[1].question);
    })
    it('should test TextqPreviewModel initialization',()=>{
        expect(textQModel.questionId).toBe(1);
        expect(textQModel.questionType).toBe("SHORT_TEXT");
        expect(textQModel.questionText).toBe("What is your first name ?")
        expect(textQModel.required).toBe(true);
        expect(textQModel.description).toBe("Enter your first name")
        expect(textQModel.imageUrl).toBe('./');
    })

    it("should test the request object",()=>{
        expect(textQModel.getRequestObject()).toMatchObject({
            question_id: 1,
            choice_response_details: null,
            text_response_details: null
        })
    })

    it("onChangeResponseText",()=>{
        textQModel.onChangeResponseText("Muneera");
        expect(textQModel.textResponseDetails).toBe("Muneera");
    })

    
})