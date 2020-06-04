import React from 'react';
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

import {QuestionEdit} from './styledComponents';

const QuestionEditOptions = (props) =>{
    return (

        <QuestionEdit>
            <AiTwotoneSetting/>
            <AiFillDelete/>
        </QuestionEdit>

    );
}

export {QuestionEditOptions}