import React, {Component, PropTypes} from 'react';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import AppNavDrawer from './AppNavDrawer';
import {blue500} from 'material-ui/styles/colors';

export default class Header extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    navDrawerOpen: false
  };

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme
    });
  };

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open
    });
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false
    });
  };

  render() {

    let docked = true;
    let {navDrawerOpen} = this.state;    

    const router = this.context.router;
    const {ticket} = this.state;

    return (
      <AppBar
        style={{backgroundColor: blue500}}
        className = "header"
        title={this.props.header}
        onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
         >
           <MenuItem primaryText="Logout" />
        </IconMenu>
        }
      >
      <AppNavDrawer
        docked={docked}
        open={navDrawerOpen}
        onChangeList={this.handleChangeList}
        onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
        onRequestChange={(open) => this.setState({open})}
      />
      </AppBar>
    );
  }
}
