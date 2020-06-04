import React,{Components} from 'react';
import { IoMdHappy } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { BsTextCenter } from 'react-icons/bs'
import { MdShortText } from 'react-icons/md'


import strings from '../../../i18n/strings.json';
import {QuestionIconButton,QuestionNumber} from './styledComponents';

import {
    welcomeIconButton,
    thankyouIconButton,
    longTextIconButton,
    shortTextIconButton,
    mcqIconButton
} from '../../../themes/colors';

const QuestionIcon = (props) =>{
    const {
        createRoute:{
            welcomeScreen,
            mcqscreen,
            shortTextScreen,
            longTextScreen,
            thankYouScreen
        }
    } = strings
    const {type,questionNumber} = props;
    let icon;
    let color;
    switch(type){
        case welcomeScreen.questionType:
                icon = <IoMdHappy/>;
                color = welcomeIconButton;
                break;
        case thankYouScreen.questionType:
                icon = <IoMdHappy/>
                color = thankyouIconButton;
                break;
        case mcqscreen.questionType:
                icon = <FaCheck/>
                color = mcqIconButton;
                break;
        case shortTextScreen.questionType:
                icon=<MdShortText/>
                color = shortTextIconButton;
                break;
        case longTextScreen.questionType:
                icon = <BsTextCenter/>
                color=longTextIconButton
                break;
    }
    
    return (

        <QuestionIconButton color={color} className="border-2">
            {icon}
            <QuestionNumber>{questionNumber}</QuestionNumber>
        </QuestionIconButton>

    )
} 

export {QuestionIcon}