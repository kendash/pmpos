import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import Event from 'material-ui/svg-icons/action/event';
import DesktopWindows from 'material-ui/svg-icons/hardware/desktop-windows';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import StoreMallDirectory from 'material-ui/svg-icons/maps/store-mall-directory';
import Public from 'material-ui/svg-icons/social/public';
import ChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import Settings from 'material-ui/svg-icons/action/settings';


const styles = {
  title: {
    cursor: 'default'
  }
};

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const {ticket} = this.state;
    return (
      <AppBar
        className = "header"
        title={<span style={styles.title}>{this.props.header}</span>}
        onLeftIconButtonTouchTap={this.handleToggle}
        //showMenuIconButton={false}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
         >
           <MenuItem primaryText="Kitchen Screen" />
           <MenuItem primaryText="Management Screen" />
           <MenuItem primaryText="Reports" />
        </IconMenu>
        }
        >
    
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        
        <AppBar
          className = "header"
          title="Main Menu"
          showMenuIconButton={false}

        />
          <MenuItem leftIcon={<Event />} onTouchTap={this.handleClose}>Work Periods </MenuItem>
          <MenuItem leftIcon={<DesktopWindows />} onTouchTap={this.handleClose}>POS</MenuItem>
          <MenuItem leftIcon={<LibraryBooks />} onTouchTap={this.handleClose}>Tickets</MenuItem>
          <MenuItem leftIcon={<AccountBalance />} onTouchTap={this.handleClose}>Accounts</MenuItem>
          <MenuItem leftIcon={<StoreMallDirectory />} onTouchTap={this.handleClose}>Warehouses</MenuItem>
          <MenuItem leftIcon={<Public />} onTouchTap={this.handleClose}>Samba Market</MenuItem>
          <MenuItem leftIcon={<ChromeReaderMode />} onTouchTap={this.handleClose}>Reports</MenuItem>
          <MenuItem leftIcon={<Settings />} onTouchTap={this.handleClose}>Manage</MenuItem>

        </Drawer>
        
      </AppBar>
    );
  }
}
