import React,{Component} from 'react';
import {IoIosArrowUp} from 'react-icons/io';
import {IoIosArrowDown} from 'react-icons/io';

import {
    Navigator,
    TopNavigator,
    BottomNavigator
} from './styledComponents';

//Todo : disabling The nav Buttons if there are no questions left

const QuestionNavigator = (props) =>{
    const {
        getNextQuestion,
        getPreviousQuestion,
        questionNumber,
        totalScreens
    } = props;
    const isTopDisable = questionNumber===0;
    const isBottomDisable = questionNumber===totalScreens;
    return <Navigator>
            <TopNavigator onClick={getPreviousQuestion} disabled = {isTopDisable}>
                <IoIosArrowUp/>
            </TopNavigator>
            <BottomNavigator onClick={getNextQuestion} disabled={isBottomDisable}>
                <IoIosArrowDown/>
            </BottomNavigator>
        </Navigator>
}

export default QuestionNavigator;