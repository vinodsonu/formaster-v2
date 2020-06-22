import React, { Component } from 'react';
/** @jsx jsx */
import {css,jsx} from '@emotion/core';

import BaseButton from '../BaseButton';
import {outlineButtonCss} from './styledComponents';

class OutlineButton extends Component {
    render() {
        return (
            <BaseButton 
                {...this.props}
                css={outlineButtonCss}
            />
        );
    }
}

export  {OutlineButton};