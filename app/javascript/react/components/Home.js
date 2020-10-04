import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../utils/history';
import { alertActions } from '../actions/alertActions';
import LoginCheck from './LoginCheck';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

class Home extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }

                        <Router history={history} >
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/register" component={Signup} />
                                <Route exact path="/profile" component={Profile} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

export default connect(
    mapStateToProps,
    actionCreators
)(Home);