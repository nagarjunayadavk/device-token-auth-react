import * as actions from '../actions/actionTypes';

import { ACCESS_TOKEN, CLIENT, UID, EXPIRY } from '../constants'
const initialState = '';

export default function accessToken (state = initialState, action) {
	switch (action.type) {
	case actions.SET_ACCESS_TOKEN:
		if (action.payload) {
			localStorage.setItem(ACCESS_TOKEN, action.payload);
			return action.payload;
		} if (action.payload === '') {
			localStorage.removeItem(ACCESS_TOKEN);
			return initialState;
		} else {
			return state;
		}
	case actions.SET_SIGNIN_RESULT:
		if (action.payload["access-token"]) {
			localStorage.setItem(ACCESS_TOKEN, action.payload["access-token"]);
			localStorage.setItem(CLIENT, action.payload["client"]);
			localStorage.setItem(UID, action.payload["uid"]);
			localStorage.setItem(EXPIRY, action.payload["expiry"]);
			return action.payload['access-token'];
		} else {
			return state;
		}
	case actions.REHYDRATE:
		return action.payload.accessToken || state;
	default:
		return state;
	}
}