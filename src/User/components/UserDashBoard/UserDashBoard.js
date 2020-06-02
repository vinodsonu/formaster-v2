import React,{Component} from 'react';
import DashBoardHeader from "../../../Common/components/DashBoardHeader";
import DashBoardBody from "../DashBoardBody";

import {
    UserDashBoardContainer
} from './styledComponents';

class UserDashBoard extends Component{
    render(){
        const {
            userProfileDetails,
            forms,
            onClickForm,
            userSignOut
        } = this.props;
        return (

            <UserDashBoardContainer>
                <DashBoardHeader userProfileDetails={userProfileDetails} userSignOut={userSignOut}/>
                <DashBoardBody forms={forms} onClickForm={onClickForm}/>
            </UserDashBoardContainer>

        );
    }
}

export {UserDashBoard}