import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const style = {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    width: '300px',
    height: '100px',
    left: '50%',
    top:'50%',
    marginLeft:'-150px',
    marginTop: '-50px' 
}

const textfieldStyle= {
    marginLeft: '20',
    marginRight: '20',
    marginTop: '20'
}

const paperStyle = {
    height: 300,
    margin: 0,
    textAlign: 'center',
    display: 'flex'
};
const buttonStyle = {
    margin: 0,
    marginTop: 40,
    width: '50%'
}
export default class Login extends React.Component {

    render() {
        return (
            <div style={style}>
                <Paper style={paperStyle} zDepth={3} rounded={true}  >
                    <div> 
                        <AppBar
                            title="PM-POS"
                            showMenuIconButton={false}
                        />                    
                        <TextField
                            style={textfieldStyle}
                            hintText="Pin Number"
                            floatingLabelText="Enter Your Pin"
                            type="password"
                        />
                        <RaisedButton 
                            primary={true} 
                            label="LogIn" 
                            style={buttonStyle} 
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}
Login.contextTypes = {
    router: React.PropTypes.object
};