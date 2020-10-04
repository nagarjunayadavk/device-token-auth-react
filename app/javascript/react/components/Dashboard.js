import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Posts from './posts/Posts';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleLogout = () => {
        this.props.logout();
    }
    render() {

        const { user, loggedIn } = this.props;
        return (
            <Fragment>
                {
                    loggedIn ?
                        <Link to="/" onClick={this.handleLogout}>Sign out</Link>
                        : null
                }
                Dashboard page <br />
                <Posts/>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const { authentication } = state;
    const { user, loggedIn } = authentication;
    return { user, loggedIn };
}

const mapDispatchToProps = {
    logout: userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
