import axios from 'axios';
import { get as _get } from 'lodash';
import axiosRetry from 'axios-retry';

var axiosConfig = axios.create({
	headers: {
		'Content-Type': 'application/json',
	}
});

/**
 * Request interceptor
 */
axiosConfig.interceptors.request.use(
	(axiosConf) => {
		return axiosConf;
	},
	error => Promise.reject(error)
);

/**
 * Response interceptor
 */
const interceptor = axiosConfig.interceptors.response.use(
		response => response,
		error => {
				if (_get(error, 'response.status', 500) !== 401) {
						return Promise.reject(error);
				} 
				//TODO: 401 response, Reset app session here, Ideally clear user data from redux or clear tokens. 
				axiosConfig.interceptors.response.eject(interceptor);
		}
);

/**
 * Retry request 3 times before throwing an error
 */
axiosRetry(axiosConfig, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export default axiosConfig;
