import React, { Component } from 'react';
import {withRouter,Redirect} from 'react-router-dom';
import {goToLoginPage} from '../../utils/NavigationUtils';

//Todo : nested routing on clicking particular form /forms/1/questions/1
//Todo : using redirect in render to avoid the previous data in the components
//      or else checking the data before doing the network calls
//Todo : Pagination with query parameters
//Todo : 



class Practice extends Component {
    componentDidMount(){
    //     const {
    //         history
    //     } = this.props;
        //goToLoginPage(history);
    }
    render() {
        return (

            <div>
                Practice
            </div>
        );
    }
}

export default withRouter(Practice);