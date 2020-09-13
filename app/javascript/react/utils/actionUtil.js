import { ACCESS_TOKEN } from '../constants';

export const getHeaders = () => {
	const headers = new Headers({
		'Content-Type': 'application/json'
	});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
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