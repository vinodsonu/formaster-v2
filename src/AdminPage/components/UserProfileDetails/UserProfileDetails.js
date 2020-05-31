import React from 'react'
import { observer } from 'mobx-react';

import strings from '../../i18n/strings.json';
import withToggle from '../../hocs/withToggle'

import {
    UserProfile,
    ProfileName,
    ProfilePic,
    Username,
    ProfileAndLogout,
    LogoutButton
} from './styledComponents.js'

@observer
class UserProfileDetails extends React.Component {
   
   

    userSignOut = () => {
      const { userSignOut } = this.props
      userSignOut()
    }

    renderProfileCard = () => {
      const { logoutText } = strings
      const { toggleStatus,userProfileDetails } = this.props
        const { name } = userProfileDetails[0];
      return toggleStatus ? 
          <ProfileAndLogout>
            <ProfileName data-testid='user-profile'>
                <ProfilePic>{name[0]}</ProfilePic>
                <Username>{name}</Username>
            </ProfileName>
            <LogoutButton onClick={this.userSignOut}>{logoutText}</LogoutButton>
          </ProfileAndLogout>
        : null
    }

    render() {
      
      const {
          onToggle,
          userProfileDetails
      } = this.props;
      const { name } = userProfileDetails[0]
      
      return (
          <UserProfile>
            <ProfileName onClick={onToggle} data-testid='user-profile'>
                <ProfilePic>{name[0]}</ProfilePic>
                <Username>{name}</Username>
            </ProfileName>
            {this.renderProfileCard()}
          </UserProfile>
      )
    }
}

export default withToggle(UserProfileDetails)


// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';

// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);

// export default function CustomizedMenus() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         aria-controls="customized-menu"
//         aria-haspopup="true"
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//       >
//         Open Menu
//       </Button>
//       <StyledMenu
//         id="customized-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <StyledMenuItem>
//           <ListItemIcon>
//             <SendIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Sent mail" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           <ListItemIcon>
//             <DraftsIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Drafts" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           <ListItemIcon>
//             <InboxIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Inbox" />
//         </StyledMenuItem>
//       </StyledMenu>
//     </div>
//   );
// }

