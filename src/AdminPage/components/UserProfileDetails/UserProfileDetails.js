// import React from 'react'

// import withToggle from '../../hocs/withToggle'



// @observer
// class UserProfileDetails extends React.Component {
   
   

    
//     renderProfileCard = () => {
//       
//       const { toggleStatus,userProfileDetails } = this.props
//         const { name } = userProfileDetails[0];
//       return toggleStatus ? 
//           <ProfileAndLogout>
//             
//             
//           </ProfileAndLogout>
//         : null
//     }

//     render() {
      
//       
      
//       return (
//           <UserProfile>
//             
//             {this.renderProfileCard()}
//           </UserProfile>
//       )
//     }
// }

// export default withToggle(UserProfileDetails)


import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { observer } from 'mobx-react';

import strings from '../../i18n/strings.json';

import {
    UserProfile,
    ProfileName,
    ProfilePic,
    Username,
    ProfileAndLogout,
    LogoutButton
} from './styledComponents.js'


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const  UserProfileDetails= observer((props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const userSignOut = () => {
    
      const { userSignOut } = props
     
      userSignOut()
    }

  
  const {
          userProfileDetails
      } = props;
      const { name } = userProfileDetails
  const { logoutText } = strings
  return (
    <UserProfile>
        <ProfileName aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                      onClick={handleClick} data-testid='user-profile'>
                <ProfilePic>{name[0]}</ProfilePic>
                 <Username>{name}</Username>
            </ProfileName>
  
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ProfileName data-testid='user-profile'>
                 <ProfilePic>{name[0]}</ProfilePic>
                 <Username>{name}</Username>
             </ProfileName>
        </StyledMenuItem>
        <StyledMenuItem>
          <LogoutButton onClick={userSignOut}>{logoutText}</LogoutButton>
        </StyledMenuItem>
      </StyledMenu>
    </UserProfile>
  );
})

export {UserProfileDetails};