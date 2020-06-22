import BasicPreviewModel from './';
import getPreviewDetails from '../../../fixtures/getPreviewDetails.json'

describe("BasicPreviewModel",()=>{
    let basicModel
    beforeEach(()=>{
        basicModel = new BasicPreviewModel(getPreviewDetails[2].question);
    })

    it("BasicPreviewModel init",()=>{
        expect(basicModel.questionId).toBe(2);
        expect(basicModel.questionType).toBe("MULTIPLE_CHOICE");
        expect(basicModel.questionText).toBe("Your native place ?")
        expect(basicModel.required).toBe(true);
        expect(basicModel.description).toBe("select your native place ?")
        expect(basicModel.imageUrl).toBe('./');
        
    })
})