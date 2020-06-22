import McqPreviewModel from './';
import getPreviewDetails from '../../../fixtures/getPreviewDetails.json'

describe("test McqPreviewModel",()=>{
    let mcqPreviewModel;
    beforeEach(()=>{
        mcqPreviewModel = new McqPreviewModel(getPreviewDetails[2].question);
    })

    it("McqPreviewModel init",()=>{
        expect(mcqPreviewModel.questionId).toBe(2);
        expect(mcqPreviewModel.questionType).toBe("MULTIPLE_CHOICE");
        expect(mcqPreviewModel.questionText).toBe("Your native place ?")
        expect(mcqPreviewModel.required).toBe(true);
        expect(mcqPreviewModel.description).toBe("select your native place ?")
        expect(mcqPreviewModel.imageUrl).toBe('./');
        expect(mcqPreviewModel.responseChoice).toBe('null')
    })

    it("onChangeResponseChoice",()=>{
        mcqPreviewModel.onChangeResponseChoice(2);
        expect(mcqPreviewModel.responseChoice).toBe(2)
    })
})