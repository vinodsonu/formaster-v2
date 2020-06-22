import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import {css} from '@emotion/core';

import Button from '.';


export const BaseButtonWrapper = styled.button`
    background-color:${props=>props.disabled?"grey":"blue"};
    cursor:${props=>props.disabled?"":"pointer"};
    color:white;
    padding:10px;
`

export const ButtonText = styled.span``

export const rectanglarCss = css`

    border-radius:0px;

`

export const ovalCss = css`
    border-radius:20px;
`

export const ButtonWrapper = styled(Button)`
    background-color:green;
`