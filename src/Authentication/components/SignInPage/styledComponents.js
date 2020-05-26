import styled from "@emotion/styled";
import tw from "tailwind.macro";

const LoginPage = styled.div`

    ${tw` flex justify-center bg-blue-100 flex-col items-center`}
    width:100%;
    height:100vh;
    
    

`;

const LoginForm = styled.div`

    ${tw`flex border-2 flex-col p-5`}
    background-color:white;
    
    

`;


const Username = styled.input`

    ${tw`border-2 p-3 m-2`}
    

`;

const Password = styled.input`

    ${tw`border-2 p-3 m-2`}
    

`;

const SubmitButton = styled.button`

    ${tw`border-2 p-3 bg-blue-900 text-white rounded-sm`}
    

`;

const ErrorMessage = styled.p`

    ${tw`flex justify-center m-2`}
    color:red;
    
    

`;

const SinInHeading = styled.p`

    ${tw`font-bold m-2`}
    
    

`;



export {
    LoginPage,
    LoginForm,
    Username,
    Password,
    SubmitButton,
    ErrorMessage,
    SinInHeading
}