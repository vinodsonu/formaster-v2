import React, { Component } from 'react';

import {ButtonText,BaseButtonWrapper} from './styledComponents';

class BaseButton extends Component {


    renderButtonText = () =>{
        const {text,textTypo:Element} = this.props;
        if(Element)
            return <Element>{text}</Element>
        return <ButtonText>{text}</ButtonText>
    }

    isEnable = () =>{
        const {disabled} = this.props;
        return !disabled;
    }

    render() {
        const {
            onClick,
            disabled,
            className
        } = this.props;
        const otherProps = {className,disabled};
        if(this.isEnable())
            otherProps.onClick = onClick;
        return (
            <BaseButtonWrapper {...otherProps}>
                {this.renderButtonText()}
            </BaseButtonWrapper>

        );
    }
}

export default BaseButton;