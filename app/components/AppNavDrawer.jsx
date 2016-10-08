import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Event from 'material-ui/svg-icons/action/event';
import DesktopWindows from 'material-ui/svg-icons/hardware/desktop-windows';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import StoreMallDirectory from 'material-ui/svg-icons/maps/store-mall-directory';
import Public from 'material-ui/svg-icons/social/public';
import ChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import Settings from 'material-ui/svg-icons/action/settings';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const styles = {
  MenuItem: {
    fontSize: 15
  },
    logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  }
}; 

export default class AppNavDrawer extends React.Component {

  static propTypes = {
    docked: PropTypes.bool.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleTouchTapHeader = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  handleClose = () => this.setState({open: false});
    
     render() {
        const {location,docked,onRequestChangeNavDrawer,onChangeList,open,style} = this.props;

         return (
            <Drawer
                style={style}
                docked={false}
                onRequestChange={onRequestChangeNavDrawer}
                containerStyle={{zIndex: zIndex.drawer - 100}}
                open={open}
            >
                <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
                Main Menu
                </div>

                <MenuItem leftIcon={<Event />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Work Periods</span></MenuItem>
                <MenuItem leftIcon={<DesktopWindows />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>POS</span></MenuItem>
                <MenuItem leftIcon={<LibraryBooks />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Tickets</span></MenuItem>
                <MenuItem leftIcon={<AccountBalance />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Accounts</span></MenuItem>
                <MenuItem leftIcon={<StoreMallDirectory />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Warehouses</span></MenuItem>
                <MenuItem leftIcon={<Public />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Samba Market</span></MenuItem>
                <MenuItem leftIcon={<ChromeReaderMode />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Reports</span></MenuItem>
                <MenuItem leftIcon={<Settings />} onTouchTap={this.handleClose}><span style ={styles.MenuItem}>Manage</span></MenuItem>

            </Drawer>
         );
     }
}
