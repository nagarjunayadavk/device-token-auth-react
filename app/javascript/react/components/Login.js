import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/userActions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        this.handleOAuth();
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login({
            email: email,
            password: password,
        });
    }

    handleOAuth(){
        let searchParams = this.props.location.search
        const params = new URLSearchParams(searchParams);
        const auth_token = params.get('auth_token');
        if (auth_token) {
            this.props.oAuthLogin(params);
        }
    }
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
        
                <form>
                    <input name="email" onChange={(e) => this.setState({ email: e.target.value })} />
                    <input name="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <input type="button" value="Submit" onClick={this.handleSubmit} />
                </form>
                <div className="form-group">
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
                
                <a href="/api/v1/auth/facebook?auth_origin_url=http://localhost:3000"> Login with Fabcebook </a> <br /><br />
                <a href="/api/v1/auth/github?auth_origin_url=http://localhost:3000"> Login with GitHub </a> <br /><br />
                <a href="/api/v1/auth/google?auth_origin_url=http://localhost:3000"> Login with Google </a> <br /><br />
                {/* omniauth_window_type=newWindow */}
            </div>
        );
    }
}

function mapStateProps(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const mapDispatchToProps = {
    login: userActions.login,
    logout: userActions.logout,
    oAuthLogin: userActions.oAuthLogin
};

export default connect(mapStateProps, mapDispatchToProps)(LoginPage);
