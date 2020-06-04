import React,{Component} from 'react';
import {IoIosArrowUp} from 'react-icons/io';
import {IoIosArrowDown} from 'react-icons/io';

import {
    Navigator,
    TopNavigator,
    BottomNavigator
} from './styledComponents';

const QuestionNavigator = (props) =>{
    const {
        getNextQuestion,
        getPreviousQuestion
    } = props;
    return <Navigator>
            <TopNavigator onClick={getPreviousQuestion}>
                <IoIosArrowUp/>
            </TopNavigator>
            <BottomNavigator onClick={getNextQuestion}>
                <IoIosArrowDown/>
            </BottomNavigator>
        </Navigator>
}

export default QuestionNavigator;