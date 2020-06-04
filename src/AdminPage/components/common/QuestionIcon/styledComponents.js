import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
    icon
} from '../../../themes/colors';



export const QuestionIconButton = styled.button`
    display: flex;
    -moz-box-align: center;
    align-items: center;
    border-radius: 4px;
    background-color:${props=>props.color} ;
    width: 60px;
    height: 30px;
    padding: 0px 6px;
    -moz-box-pack: justify;
    justify-content: space-between;
    cursor: pointer;
    margin-right: 10px;
    color:${icon};
    align-self:flex-start;
    margin-top:5px;
`

export const QuestionNumber = styled.span``
