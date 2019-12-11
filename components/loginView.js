import React from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from '../css/loginView.css'
import { loginAPI } from '../api/user'

export default class LoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
         password: '', 
         accountError: false, 
         accountHelper: '',
         passwordError: false, 
         passwordHelper: '',
        siginLoading: false}
    }
    accountHelperText = () => {
        if (this.state.accountError == true) {
            return this.state.accountHelper;
        }else {
            return 'please input account'
        }
    }
    passwordHelperText = () => {
        if (this.state.passwordError == true) {
            return this.state.passwordHelper;
        }else {
            return 'please input password'
        }
    }
    handlerSignIn = async () => {
        let account = this.state.account
        let password = this.state.password
        if(account==null || account=='') {
            this.setState({accountError: true, accountHelper: 'Account must be not empty'})
            return
        }
        this.setState({accountError: false, accountHelper: ''})
        if (password==null || password=='') {
            this.setState({passwordError: true, passwordHelper: 'Password must be not empty'})
            return
        }
        this.setState({passwordError: false, passwordHelper: ''})
        this.setState({siginLoading: true})
        try {
            let response = await loginAPI(account, password)
            this.setState({siginLoading: false})
            localStorage.setItem('user', JSON.stringify(response))
            location.href = '/'
        } catch (error) {
            this.setState({accountError: true, accountHelper: error.message, passwordError: true, passwordHelper: error.message})
            this.setState({siginLoading: false})
        }
    }
    handlerSignUp = () => {
        
    }
    handleAccountChange = (event) => {
        this.setState({account: event.target.value});
    }
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    render() {
        return (
            <Box 
            id={`${styles.login_view_box_id}`}
            border={1} 
            borderColor="primary.main"
            borderRadius={10}
            boxShadow={3}>
                <TextField 
                error={this.state.accountError}
                label='Account'
                helperText={this.accountHelperText()}
                margin='normal'
                fullWidth={true}
                variant='filled'
                value={this.state.account}
                onChange={this.handleAccountChange}
                  ></TextField>

                <TextField
                error={this.state.passwordError}
                label='Password'
                helperText={this.passwordHelperText()}
                type='password'
                margin='normal'
                fullWidth={true}
                variant='filled'
                value={this.state.password}
                onChange={this.handlePasswordChange}
                ></TextField>
                <div id={`${styles.login_sign_in_wrapper_id}`}>
                <Button 
                variant="contained" 
                color="primary" 
                disabled={this.state.siginLoading}
                id={`${styles.login_sign_in_id}`}
                onClick={this.handlerSignIn}>
                    Sign In
                </Button>
                {this.state.siginLoading && <CircularProgress size={24} id={`${styles.login_loading_id}`}/>}
                </div>

                <Button 
                variant='outlined' 
                color="primary"  
                id={`${styles.login_sign_up_id}`}
                onClick={this.handlerSignUp}>
                    Sign Up
                </Button>
            </Box>
        )
    }
}