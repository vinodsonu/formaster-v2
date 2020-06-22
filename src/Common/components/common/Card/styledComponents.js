import styled from '@emotion/styled';
import tw from 'tailwind.macro';

export const CardWrapper = styled.div`
    ${tw`shadow-lg p-3`}
    background-color:white;
    margin:2px;
    cursor:${props=>props.isClickable?'pointer':''};
    display: inline-block;

`

export const CardTittle = styled.span`

    ${tw`text-xl font-bold`}

`