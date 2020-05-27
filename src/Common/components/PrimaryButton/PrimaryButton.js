import React from 'react';

import {
    PrimaryButtonElement
} from './styledComponents';

class PrimaryButton extends React.Component{
    
    onClick = () =>{
        const {handleOnClick} = this.props;
        handleOnClick();
    }
    
    render(){
        const {
                displayText,
                handleOnClick,
                isDisable
            } = this.props;
        return <PrimaryButtonElement onClick= {this.onClick}
                                disabled = {isDisable}
                 >{displayText}</PrimaryButtonElement>
    }
}

export {PrimaryButton};