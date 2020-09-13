import React, { Component, Fragment } from 'react';
import Signup from './Signup';
import axios from 'axios';
import { passCsrfToken } from '../utils/helpers.js';
import { connect } from 'react-redux';

class LoginCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onSignInSubmit = this.onSignInSubmit.bind(this);
    }

    componentDidMount() {
        passCsrfToken(document, axios);
        console.log(this.props);
        let searchParams = this.props.location.search

    }

    onSignInSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
        axios
            .post('/api/v1/auth/sign_in', this.state)
            .then(response => {
                console.log(response);
                console.log(response.data);
            });
    }



    render() {
        return (

            <Fragment>
                <a href="/api/v1/auth/facebook?auth_origin_url=http://localhost:3000&omniauth_window_type=newWindow"> Fabcebook </a> <br /><br />
                <a href="/api/v1/auth/github"> github </a>
                <div>
                    <h2>Sign in</h2>
                    <form>
                        <input name="email" onChange={(e) => this.setState({ email: e.target.value })} />
                        <input name="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        <input type="button" value="Submit" onClick={this.onSignInSubmit} />
                    </form>
                </div>
                <Signup />
                {/* <Signin/> */}
                {/* <Login/> */}
            </Fragment>
        );
    }
}

export default LoginCheck;
