import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  SET_ACCESS_TOKEN, SET_SIGNIN_FETCHING, SET_SIGNIN_RESULT
} from './actionTypes';
import { history } from '../utils/history'

import { alertActions } from './alertActions';

import axios from 'axios';
import { CLIENT, UID, ACCESS_TOKEN, EXPIRY } from '../constants';

export const userActions = {
  login,
  logout,
  register,
  oAuthLogin
};


const fetchSigninSuccess = (body) => ({
  type: SET_SIGNIN_RESULT,
  payload: body,
});

const fetchSigninFailure = (ex) => ({
  type: SET_SIGNIN_RESULT,
  payload: ex,
});


function oAuthLogin(params) {

  const oAuthloginInfo = {};
  oAuthloginInfo[ACCESS_TOKEN] = params.get('auth_token');
  oAuthloginInfo[CLIENT] = params.get('client_id');
  oAuthloginInfo[UID] = params.get('uid');
  oAuthloginInfo[EXPIRY] = params.get('expiry');

  return dispatch => {
    dispatch(success(oAuthloginInfo))
    dispatch(fetchSigninSuccess(oAuthloginInfo));
    history.push('/dashboard');
  }

}

function login(signinRequest) {
  const { email } = signinRequest;

  return dispatch => {
    dispatch(request({
      email
    }));

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      }
    }

    return axios.post('/api/v1/auth/sign_in', signinRequest,
      options
    )
      .then((response) => {
        dispatch(success(response.data));
        dispatch(fetchSigninSuccess(response.headers));
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });


    // userService.login(email, password)
    //   .then(
    //     user => {
    //       dispatch(success(user));
    //       history.push('/');
    //     },
    //     error => {
    //       dispatch(failure(error));
    //       dispatch(alertActions.error(error));
    //     }
    //   );
  };


}

function request(user) {
  return {
    type: LOGIN_REQUEST,
    user
  }
}

function success(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function failure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(CLIENT);
  localStorage.removeItem(UID);
  localStorage.removeItem(EXPIRY);

  return { type: LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      }
    }
    axios.post('/api/v1/auth',  user, options)
    .then(function (response) {
      dispatch(success());
      history.push('/');
      console.log("response ", response);
      dispatch(failure(error));
      // that.props.changePage("delete");
      // that.props.updateCurrentUser(email);
    })
    .catch(function (error) {
      console.log(error)
    });

    // userService.register(user)
    //   .then(
    //     user => {
    //       dispatch(success());
    //       // history.push('/login');
    //       dispatch(alertActions.success('Registration successful. Login to Continue!'));
    //     },
    //     error => {
    //       console.log(error, 'error--------------------------')
    //       dispatch(failure(error));
    //       dispatch(alertActions.error(error));
    //     }
    //   );
  };

  function request(user) {
    return {
      type: REGISTER_REQUEST,
      user
    }
  }
  function success(user) {
    return {
      type: REGISTER_SUCCESS,
      user
    }
  }
  function failure(error) { return { type: REGISTER_FAILURE, error } }
}