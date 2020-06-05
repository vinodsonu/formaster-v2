import React,{Component} from 'react';
import strings from '../../../i18n/strings.json';
import {observer} from 'mobx-react';

import {Button} from './styledComponents'

@observer
class PreviewNavButton extends Component{
    render(){
        const {
            startButtonText,
            submitButtonText,
            okButtonText,
            welcomeScreen,
            thankyouScreen
        } = strings;
        const {
            questionType,
            questionNumber,
            totalQuestions,
            handleOnClick,
            questionResponseText,
            questionChoiceResponse,
            questionListSize,
            questionPosition
        } = this.props;

        let buttonText = '';
        if(questionResponseText!==undefined && questionResponseText!=='')
                buttonText = okButtonText;
        if(questionChoiceResponse!==null && questionChoiceResponse!==undefined)
                buttonText = okButtonText;
        if(questionType===welcomeScreen)
                buttonText = startButtonText;
        else if(questionType===thankyouScreen)
                buttonText = submitButtonText;
        if(questionPosition+1 === questionListSize)
                buttonText = submitButtonText;
        return buttonText!==''?<Button onClick={handleOnClick}>
                                        {buttonText}
                                </Button>:null;
    }
}

export {PreviewNavButton}