import styled from "@emotion/styled";
import tw from "tailwind.macro";

const InputElement = styled.input`

    display: block;
    font-size: 16px;
    width: 256px;
    height: 40px;
    margin: 3px 0px;
    border-radius: 3px;
    padding: 0px 14px;
    color: rgb(76, 76, 76);
    border:${props=>props.isFeildError?'1px solid red':'1px solid rgb(204, 204, 204)'};
    font-family: inherit;
    transition: border-color 0.2s ease 0s;

`;

const InputWithLabel = styled.div`

    ${tw`flex flex-col mt-2 mb-2`}

`;

const InputLabel = styled.span`

    font-size: 16px;
    line-height: 24px;
    color: rgb(38, 38, 39);
`;

export {
    InputElement,
    InputWithLabel,
    InputLabel
}

