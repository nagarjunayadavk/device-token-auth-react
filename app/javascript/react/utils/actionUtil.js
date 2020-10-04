import { ACCESS_TOKEN, UID, CLIENT } from '../constants';
export const getHeaders = () => {
	const headers = new Headers({
		'Content-Type': 'application/json'
	});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		// headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
		headers.append('access-token', localStorage.getItem(ACCESS_TOKEN));
		headers.append('uid', localStorage.getItem(UID));
		headers.append('client', localStorage.getItem(CLIENT));
		headers.append('token-type', 'Bearer');
		headers.append('csrf-token', 'csrf Token');
		headers.append('expiry', localStorage.getItem(EXPIRY));
		
		
	}

	return headers;
};

export const getHeadersFormData = () => {
	const headers = new Headers({});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
	}

	return headers;
};