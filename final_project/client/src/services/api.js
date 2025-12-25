import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/books';

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export const getBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBook = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await axios.post(API_URL, bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Borrow a book
export const borrowBook = (id) => axios.put(`${API_URL}/borrow/${id}`);

// Return a book
export const returnBook = (id) => axios.put(`${API_URL}/return/${id}`);

export default {
    getAllBooks: getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};