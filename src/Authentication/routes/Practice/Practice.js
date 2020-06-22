import React, { Component } from 'react';
/** @jsx jsx */
import { jsx,css } from "@emotion/core"
import {withRouter,Redirect} from 'react-router-dom';
import {goToLoginPage} from '../../utils/NavigationUtils';
import Modal from '../../../Common/components/common/Modal';
import ReactSelect from '../../../Common/components/common/ReactSelect'
import {observer} from 'mobx-react'

import { Container, Header, List } from "semantic-ui-react";

import {PracticeWrapper,wrapperCss} from './styledComponents';

//Todo : nested routing on clicking particular form /forms/1/questions/1
//Todo : using redirect in render to avoid the previous data in the components
//      or else checking the data before doing the network calls
//Todo : Pagination with query parameters
//Todo : 


@observer
class Practice extends Component {
    componentDidMount(){
    //     const {
    //         history
    //     } = this.props;
        //goToLoginPage(history);
    }
    render() {
        return (

            <PracticeWrapper css={wrapperCss}>
                <Modal/>
                <ReactSelect/>
            </PracticeWrapper>
        );
    }
}

export default withRouter(Practice);