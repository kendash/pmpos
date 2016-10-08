import React from 'react';
import Header from '../Header';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0'
  },
  propToggleHeader: {
    margin: '20px auto 10px'
  }
};

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true
  },
  {
    name: 'Randal White',
    status: 'Unemployed'
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true
  },
  {
    name: 'Steve Brown',
    status: 'Employed'
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed'
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed'
  },
  {
    name: 'Adam Moore',
    status: 'Employed'
  }];

export default class CustomReports extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '400px',
      value: 3,
      open: false,
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
      mode: 'portrait',
      container: 'inline',
      underlineShow: true
    };
  }
  
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date
    });
  };

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  render() {
    return (
      <div>
      <Header header = "Reports"/>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                SambaPOS <br/> Work Period Report
              </TableHeaderColumn>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <Toolbar>
          <ToolbarGroup>
          <FlatButton>Start Date</FlatButton>
          <DatePicker
              onChange={this.handleChangeMinDate}
              autoOk={this.state.autoOk}
              defaultDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
              mode={this.state.mode}
              container={this.state.container}
              underlineShow={this.state.underlineShow}
            />
          <FlatButton label="End Date"/>
          <DatePicker
              onChange={this.handleChangeMaxDate}
              autoOk={this.state.autoOk}
              defaultDate={this.state.maxDate}
              disableYearSelection={this.state.disableYearSelection}
              mode={this.state.mode}
              container={this.state.container}
              underlineShow={this.state.underlineShow}
            />

          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="muidocs-icon-custom-sort" />
            <RaisedButton onTouchTap={this.handleTouchTap} label="Print Report" primary={true} />
            <Snackbar
              open={this.state.open}
              message="Report printed successfully!"
              autoHideDuration={4000}
          />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Save" />
            <MenuItem primaryText="Email" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>

      </div>
    );
  }
      selectReport = () => {
        this.context.router.push('/');
    }

}
CustomReports.contextTypes = {
    router: React.PropTypes.object
};

