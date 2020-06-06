import React,{Component} from 'react';
import {IoIosArrowUp} from 'react-icons/io';
import {IoIosArrowDown} from 'react-icons/io';

import {
    Navigator,
    TopNavigator,
    BottomNavigator
} from './styledComponents';
import { THANK_YOU_SCREEN } from "../../../AdminPage/constants/QuestionTypeContants"

//Todo : disabling The nav Buttons if there are no questions left

const QuestionNavigator = (props) =>{
    const {
        getNextQuestion,
        getPreviousQuestion,
        questionNumber,
        totalScreens,
        questionType
    } = props;
    const isTopDisable = questionNumber===0;
    const isBottomDisable = questionNumber===totalScreens;
    return questionType!==THANK_YOU_SCREEN?<Navigator>
            <TopNavigator onClick={getPreviousQuestion} disabled = {isTopDisable}>
                <IoIosArrowUp/>
            </TopNavigator>
            <BottomNavigator onClick={getNextQuestion} disabled={isBottomDisable}>
                <IoIosArrowDown/>
            </BottomNavigator>
        </Navigator>:null
}

export default QuestionNavigator;