import React, { Component } from 'react';
/** @jsx jsx */
import {css,jsx} from '@emotion/core';


import BaseButton from './BaseButton';
import OutlineButton from './OutlineButton'

import {buttonTypes,buttonVariants} from './constants'
import {rectanglarCss,ovalCss} from './styledComponents';

class Button extends Component {

    static defaultProps = {
        type:buttonTypes.filled,
        variant:buttonVariants.oval
    }

    static buttonTypesConstants = buttonTypes;
    static buttonVariantsConstants = buttonVariants;

    buttonVariantCss = () =>{
        const {
            rectanglar,
            oval
        } = buttonVariants
        const {variant} = this.props;

        switch(variant){
            case rectanglar:
                return rectanglarCss
            case oval:
                return ovalCss
            default :
                console.warn("invalid button variant");
                return null
            
        }
    }

    render() {
        const {type,variant,...otherProps} = this.props;
        const {
            outline,filled
        } = buttonTypes
        
        switch(type)
        {
            case filled:
                return <BaseButton {...otherProps} css={this.buttonVariantCss()}/>
            case outline:
                return <OutlineButton {...otherProps} css={this.buttonVariantCss()}/>
            default:
                console.warn("invalid button type")
                return null;
        }
    }
}

export default Button;