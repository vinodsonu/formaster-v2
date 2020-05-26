import styled from "@emotion/styled";
import tw from "tailwind.macro";

const PrimaryButtonElement = styled.button`
    ${tw`mt-2 mb-2`}
    display: block;
    font-size: 16px;
    line-height: 28px;
    width: 256px;
    height: 40px;
    padding: 3px 16px;
    color: rgb(255, 255, 255);
    background-color: rgb(38, 38, 39);
    font-family: inherit;
    text-decoration: none;
    border-radius: 2px;
    vertical-align: middle;
    -moz-appearance: none;
    cursor: pointer;
    transition: background-color 0.2s ease 0s;
    border: medium none;
`;

export {
    PrimaryButtonElement
}