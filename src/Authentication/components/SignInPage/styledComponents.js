import styled from "@emotion/styled";
import tw from "tailwind.macro";

const LoginFormContainer = styled.div`
    
    ${tw`flex flex-col items-center justify-center bg-white`}
    height:100vh;
    
    
`;

const WebTitle = styled.h1`
    ${tw`text-4xl font-bold m-5`}
`;
const GreetingMessage = styled.span`

    display: block;
    font-size: 20px;
    line-height: 24px;
    margin:10px;
`;

const ErrorMessage = styled.span`

    font-size: 16px;
    color:red;
`


export {
    LoginFormContainer,
    WebTitle,
    GreetingMessage,
    ErrorMessage
    
    
}