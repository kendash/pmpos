import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const style = {
  height: 250,
  margin: 0,
  textAlign: 'center',
  display: 'flex'
};
const style2 = {
    margin: 20,
    marginLeft: 160,
    marginTop: 50
}
export default class Login extends React.Component {

    render() {
        return (
            <div style={{alignItems: 'center',display: 'flex',position: 'absolute', width: '300px', height: '100px',left: '50%',top:'50%', marginLeft:'-150px', marginTop: '-50px'}}>
                <Paper style={style} zDepth={3} rounded={true}  >
                 
                    <div style={{width: '100%',marginBottom: '45px'}}> 
                        <AppBar
                            title="PM-POS"
                            showMenuIconButton={false}
                        />                    
                        <TextField
                            style={{marginLeft: '20', marginRight: '20'}}
                            hintText="Pin Number"
                            floatingLabelText="Enter Your Pin"
                            type="password"
                        />
                        <div style={{alignItems: 'center'}}>
                        <RaisedButton 
                            primary={true} 
                            label="LogIn" 
                            style={style2} 
                        /></div>
                        
                    </div>
                
                </Paper>
            </div>

        );
    }
}
Login.contextTypes = {
    router: React.PropTypes.object
};