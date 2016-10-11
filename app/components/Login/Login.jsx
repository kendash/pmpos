import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {grey900, grey400, grey200, cyan500, blue500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

const style = {
    mainStyle: {
        alignItems: 'center',
        display: 'flex',
        position: 'absolute',
        width: '300px',
        height: '100px',
        left: '50%',
        top:'50%',
        marginLeft:'-150px',
        marginTop: '-50px', 
        backgroundColor: blue500
    },
    textFieldStyle: {
        marginLeft: '20',
        marginRight: '20',
        marginTop: '20'
    },
    textFieldStyle2: {
        marginLeft: '20',
        marginRight: '20',
        marginTop: '0'
    },
    paperStyle: {
        height: 350,
        margin: 0,
        textAlign: 'center'
    },
    buttonStyle: {
        margin: 0,
        marginTop: 60,
        marginLeft: 20,
        marginRight: 20
    },
    hintStyle: {
        color: blue500
    },
    floatingLabelFocusStyle: {
        color: blue500
    },
    underlineFocusStyle: {
        borderColor: blue500
    },
    loginTriangle: {
        width: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '12px solid transparent',
        borderBottomColor: blue500,
        color: blue500,
        marginTop: -25

    },
    loginHeader: {
        background: blue500,
        padding: '20px',
        fontSize: '1.4em',
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#fff',
        margin: 0

    }
};


export default class Login extends React.Component {

    componentWillMount(){
        document.body.style.backgroundColor = grey400;
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    render() {
        return (
            <div>
                <div style={style.mainStyle}>
                    <Paper style={style.paperStyle} zDepth={2} rounded={false}  >
                        <div> 
                            <div style={style.loginTriangle}></div>
                            <div style={style.loginHeader}>Log in to PM-POS</div>
                            <TextField
                                style={style.textFieldStyle}
                                hintText="Username"
                                floatingLabelText="Username"
                                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                                underlineFocusStyle={style.underlineFocusStyle}
                            />
                            <TextField
                                style={style.textFieldStyle2}
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                                underlineFocusStyle={style.underlineFocusStyle}
                            />
                            <div style={style.buttonStyle}>
                            <RaisedButton 
                                fullWidth={true}
                                label="Submit" 
                                backgroundColor={blue500}
                                labelColor="#fff"
                            />
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};