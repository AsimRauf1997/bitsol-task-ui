import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosWrapper from '../../utils/api';

export const loginUser = createAsyncThunk('auth/signin', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/auth/signin`, { email, password });
        localStorage.setItem('token', response.token);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk('auth/signup', async ({ email, password, name }, { rejectWithValue }) => {
    try {
        const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/auth/signup`, { email, password, name });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
