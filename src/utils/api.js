import axios from 'axios';
import { toast } from 'react-toastify';
import { getItemFromLocalStorage } from './common';

axios.interceptors.request.use(
    (config) => {
        const token = getItemFromLocalStorage('token');
        if (token)
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => {
        toast.success(response.data.message);
        return response;
    },
    (error) => {
        let errorMessage = '';
        if (error?.response?.data) {
            // Check if the error message is an array
            if (Array.isArray(error.response.data.message)) {
                errorMessage = error.response.data.message[0];
            } else if (typeof error.response.data.message === 'string') {
                errorMessage = error.response.data.message;
            }
        }

        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const axiosWrapper = async (method, url, data, token, isFormData = false) => {
    try {
        const config = {
            method,
            url,
            ...axiosConfig
        };

        if (token) config.headers['Authorization'] = `Bearer ${token}`;

        if (isFormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.data = data;
        } else {
            if (data) config.data = data;
        }

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || error?.message;
    }
};

export default axiosWrapper;
