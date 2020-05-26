import React from 'react';

import {
    PrimaryButtonElement
} from './styledComponents';

class PrimaryButton extends React.Component{
    
    render(){
        const {
                displayText,
                handleOnClick,
                isSigningIn
            } = this.props;
        return <PrimaryButtonElement onClick= {handleOnClick}
                                disabled = {isSigningIn}
                 >{displayText}</PrimaryButtonElement>
    }
}

export {PrimaryButton};