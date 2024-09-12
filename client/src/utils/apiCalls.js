import axios from 'axios';
import Cookies from 'js-cookie';

// Helper function to get the token and check if the user is an ADMIN
const getAuthCookie = () => {
    const token = Cookies.get('jwtToken');
    if (!token) throw new Error('Token not found');

    // Decode JWT to check the role
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    if (decodedToken.role !== 'ADMIN') {
        throw new Error('Not authorized');
    }

    return token;
};

// Base configuration for axios requests
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Access-Control-Allow-Credentials": true,
    }
});

// Fetch all animal data
export const fetchAnimalData = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/animal/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the data from the API
    } catch (error) {
        console.error('Error fetching animal data:', error);
        throw error;
    }
};

// Fetch specific animal data by ID
export const fetchAnimalDataById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/animal/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the specific animal data from the API
    } catch (error) {
        console.error(`Error fetching animal data with ID ${id}:`, error);
        throw error;
    }
};

// Fetch all type animals
export const fetchTypeAnimals = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/type_animal/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the type animals data from the API
    } catch (error) {
        console.error('Error fetching type animals data:', error);
        throw error;
    }
};

export const createAnimalData = async (formData) => {
    console.log('formData', formData);
    try {
        const token = getAuthCookie();
        const response = await api.post(`/animal/`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            },
        });

        return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating animal data:', error);
        throw error;
    }
};

export const updateAnimalData = async (id, formData) => {
    console.log('formData', formData, id);
    try {
        const token = getAuthCookie();
            // const response = await api.put(`http://localhost:5000/api/animal/${id}`, formData, {
            const response = await api.put(`/animal/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'

                },
            });

            return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating animal data:', error);
        throw error;
    }
};

export const deleteAnimalById = async (id) => {
    const token = getAuthCookie();  // Retrieve the token

    try {
        // const response = await fetch(`http://localhost:5000/api/animal/${id}`, {
        const response = await fetch(`/animal/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
                'Content-Type': 'application/json'   // Optionally set Content-Type, though DELETE may not require it
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete animal');
        }

        return response.json();  // Return the server response
    } catch (error) {
        console.error('Error deleting animal:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};

export const createAdminHomePage = async (formData) => {
    console.log('formData', formData);
    try {
        const token = getAuthCookie();
        const response = await api.post(`/home_page/`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            },
        });

        return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating animal data:', error);
        throw error;
    }
};

// Fetch specific animal data by ID
export const fetchHomePageDataById = async (id) => {
    try {
        const token = getAuthCookie();
        console.log('Fetching HomePage with ID:', id);
        const response = await api.get(`/home_page/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the specific animal data from the API
    } catch (error) {
        console.error(`Error fetching home page data with ID ${id}:`, error);
        throw error;
    }
};


export const editAdminHomePage = async (formData, id) => {
    console.log('formData', formData, id);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/home_page/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            },
        });

        return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating animal data:', error);
        throw error;
    }
};

// Events // Fetch all events data
export const fetchEventsData = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/event/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the data from the API
    } catch (error) {
        console.error('Error fetching event data:', error);
        throw error;
    }
};
// Fetch specific event data by ID
export const fetchEventsById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/event/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the specific animal data from the API
    } catch (error) {
        console.error(`Error fetching animal data with ID ${id}:`, error);
        throw error;
    }
};

export const createEventData = async (eventData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/event/`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the created event data from the API
    } catch (error) {
        console.error('Error creating event data:', error);
        throw error;
    }
};


export const updateEventData = async (id, eventData) => {
    console.log(id, eventData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/event/${id}`, eventData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
        });

        return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating animal data:', error);
        throw error;
    }
};

export const deleteEventById = async (id) => {
    const token = getAuthCookie();  // Retrieve the token

    try {
        const response = await fetch(`/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
                'Content-Type': 'application/json'   // Optionally set Content-Type, though DELETE may not require it
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete event');
        }

        return response.json();  // Return the server response
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};
