import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const Pagination = styled.div`${tw`flex mr-5`}
    align-self:flex-end;

`

export const LeftArrow = styled.button`

    &:disabled{
        cursor:not-allowed;
    }

    padding:10px;
    ${tw`border-md text-white bg-black`}

`
export const RightArrow = styled.button`

&:disabled{
    cursor:not-allowed;
}

padding:10px;
${tw`border-md text-white bg-black`}

`
export const CurrentPageNumber = styled.span``;

export const  TotalPages = styled.span``;