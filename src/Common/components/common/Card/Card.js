import React, { Component } from 'react';

import {CardWrapper,CardTittle} from './styledComponents';


class Card extends Component {

    renderCardTitle = () =>{
        const {
            title,
            titleTypo:Element
        } = this.props;
        if(Element)
            return <Element>{title}</Element>
        return <CardTittle>{title}</CardTittle>
    }

    render() {
        const {
            children,
            className,
            onClick
        } = this.props;
        const isClickable = onClick?true:false;
        return (
            <CardWrapper 
                className={className} 
                isClickable = {isClickable}
                onClick={onClick}
            >
                {this.renderCardTitle()}
                {children}
            </CardWrapper>
        );
    }
}

export {Card}