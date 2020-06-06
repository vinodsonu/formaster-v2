import React from 'react';
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

import {QuestionEdit,DeleteButton} from './styledComponents';

const QuestionEditOptions = (props) =>{

    const {onDeleteQuestion,questionId} = props;

    const handleOnClick = () =>{
        onDeleteQuestion(questionId)
    }

    return (

        <QuestionEdit>
            <AiTwotoneSetting/>
            <DeleteButton onClick={handleOnClick}><AiFillDelete/></DeleteButton>
        </QuestionEdit>

    );
}

export {QuestionEditOptions}