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
import {cyan500, blue500} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';


const styles = {
    logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightStrong,
    backgroundColor: blue500,
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

  handleTouchTapPOS = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  handleTouchTapReports = () => {
    this.context.router.push('/reports');
    this.props.onRequestChangeNavDrawer(false);
  };

  handleTouchTapLogin = () => {
    this.context.router.push('/login');
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
                PM-POS
                </div>
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<Event />}
                  primaryText="Work Periods"
                  onTouchTap={this.handleTouchTapLogin}
                />
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<DesktopWindows />}
                  primaryText="POS"
                  onTouchTap={this.handleTouchTapPOS}
                />
                <Divider/>
                <Subheader>Manage Restaurant</Subheader>
                <Divider/>
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<ChromeReaderMode />}
                  primaryText="Reports"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem onTouchTap={this.handleTouchTapReports} style={{ fontSize: '13px' }} insetChildren={true} primaryText="Work Period Report" value="/get-started/required-knowledge" />,
                    <ListItem style={{ fontSize: '13px' }} insetChildren={true} primaryText="Sales Per Hour" value="/get-started/installation" />,
                    <ListItem style={{ fontSize: '13px' }} insetChildren={true} primaryText="Inventory Consumption" value="/get-started/usage" />,
                    <ListItem style={{ fontSize: '13px' }} insetChildren={true} primaryText="Wages Report" value="/get-started/server-rendering" />,
                    <ListItem style={{ fontSize: '13px' }} insetChildren={true} primaryText="Expenses" value="/get-started/examples" />
                  ]}
                />
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<LibraryBooks />}
                  primaryText="Tickets"
                />
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<StoreMallDirectory />}
                  primaryText="Warehouses"
                />
                <ListItem
                  style={{fontSize: '15'}}
                  leftIcon={<AccountBalance />}
                  primaryText="Accounts"
                />
            </Drawer>
         );
     }
}
