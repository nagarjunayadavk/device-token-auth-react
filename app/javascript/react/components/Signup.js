import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  handleSignup = (e) => {
    e.preventDefault();
    const { firstname,
      lastname,
      email,
      password,
      password_confirmation } = this.state;
    const userRegInfo = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };
    this.props.register(userRegInfo);
  }
  render() {
    return (
      <Fragment>
        <div>
          <h2>Signup</h2>
          <form>
            <input id="fname" placeholder="First Name" onChange={(e) => this.setState({ firstname: e.target.value })} />
            <input id="lname" placeholder="Last Name" onChange={(e) => this.setState({ lastname: e.target.value })} />
            <input id="email" placeholder="email" onChange={(e) => this.setState({ email: e.target.value })} />
            <input id="password" type="password" placeholder="password"
              onChange={(e) => this.setState({ password: e.target.value })} />
            <input id="password_confirmation" type="password" placeholder="retype password"
              onChange={(e) => this.setState({ password_confirmation: e.target.value })} />
            <button onClick={this.handleSignup}>Submit</button>
          </form>
          {/* <button onClick={() => this.props.changePage("login")}>Back to Login</button> */}
        </div>
      </Fragment>
    );
  }
}

function mapStateProps(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const mapDispatchToProps = {
  register: userActions.register,
};

export default connect(mapStateProps, mapDispatchToProps)(Signup);