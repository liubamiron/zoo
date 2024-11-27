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
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Ensure credentials (e.g., cookies) are included
});

// Fetch all animal data
export const fetchAnimalData = async () => {
    try {
        const response = await api.get('/animal/', {
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
        const response = await api.get(`/animal/${id}`, {
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
        const response = await api.get('/type', {
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
        const response = await api.post(`/animal`, formData, {
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
    try {
        const token = getAuthCookie();
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
        const response = await api.delete(`/animal/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
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
        const response = await api.post(`/home_page`, formData, {
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

// Fetch home data by ID
export const fetchHomePageDataById = async (id) => {
    try {
        // const token = getAuthCookie();
        console.log('Fetching HomePage with ID:', id);
        const response = await api.get(`/home_page/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
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

// get all Events
export const fetchEventsData = async () => {
    try {
        // const token = getAuthCookie();
        const response = await api.get('/event/', {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });
        return response.data; // Return the data from the API
    } catch (error) {
        console.error('Error fetching event data:', error);
        throw error;
    }
};

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
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data; // Return the created event data from the API
    } catch (error) {
        console.error('Error creating event data:', error);
        throw error;
    }
};

export const updateEventData = async (id, formData) => {
    console.log(id, formData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/event/${id}`, formData,{
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

export const deleteEventById = async (id) => {
    const token = getAuthCookie();  // Retrieve the token

    try {
        const response = await api.delete(`/event/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
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

///// news all news
export const fetchNewsData = async () => {
    try {
        const response = await api.get('/news_item', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        throw error;
    }
};

export const fetchNewsById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/news_item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the specific animal data from the API
    } catch (error) {
        console.error(`Error fetching news data with ID ${id}:`, error);
        throw error;
    }
};

export const createNewsData = async (formData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/news_item`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Return the created event data from the API
    } catch (error) {
        console.error('Error creating news data:', error);
        throw error;
    }
};

export const updateNewsData = async (id, formData) => {
    console.log(id, formData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/news_item/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
        });

        return response.data; // Return the updated animal data from the API
    } catch (error) {
        console.error('Error updating news data:', error);
        throw error;
    }
};

export const deleteNewsById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token

    try {
        const response = await api.delete(`/news_item/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
            },
        });

        // Axios automatically throws an error for non-2xx responses
        console.log('News deleted response:', response.data);

        return response.data;  // Return the server response
    } catch (error) {
        console.error('Error deleting news:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};

///get all posts
export const fetchPostsData = async () => {
    try {
        const response = await api.get('/post', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
};

export const fetchPostsById = async (id) => {
    try {
        const response = await api.get(`/post/${id}`, {
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching post data with ID ${id}:`, error);
        throw error;
    }
};

export const createPostData = async (formData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/post`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post data:', error);
        throw error;
    }
};

export const updatePostData = async (id, formData) => {
    console.log(id, formData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/post/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating post data:', error);
        throw error;
    }
};

export const deletePostById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/post/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
            },
        });
        console.log('post deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

////tags
export const createTagsData = async (tags) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/tag`, tags, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating tag data:', error);
        throw error;
    }
};

export const updateTagsData = async (id, tagData) => {
    console.log(id, tagData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/tag/${id}`, tagData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating tags data:', error);
        throw error;
    }
};

export const createOrUpdateTagsData = async (id, tagData) => {
    try {
        const token = getAuthCookie();

        if (id) {
            // Update tag if ID is provided
            const response = await api.put(`/tag/${id}`, tagData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Tag updated successfully');
            return response.data;
        } else {
            // Create new tag if no ID is provided
            const response = await api.post(`/tag`, tagData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Tag created successfully');
            return response.data;
        }
    } catch (error) {
        console.error('Error creating or updating tag data:', error);
        throw error;
    }
};


export const getAllTags = async () => {
    try {
        const response = await api.get('/tag', {
        });
        return response.data;
    } catch (error) {
        console.error('Error getting tags:', error);
        throw error;
    }
};

export const getTagsById = async (id) => {
    try {
        const response = await api.get(`/tag/${id}`, {
        });
        return response.data;
    } catch (error) {
        console.error(`Error getting tags by ID ${id}:`, error);
        throw error;
    }
};

export const fetchPostId = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/post/', {
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

export const deleteTagsById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/tag/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('tag deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting tag:', error);
        throw error;
    }
};

//// type_animals

export const createTypeAnimalsData = async (tags) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/type`, tags, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating tag data:', error);
        throw error;
    }
};

export const updateTypeAnimalsData = async (id, typeAnimalData) => {
    console.log(id, typeAnimalData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/type/${id}`, typeAnimalData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating type_animal data:', error);
        throw error;
    }
};

export const getAllTypeAnimals = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/type', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting type_animal:', error);
        throw error;
    }
};

export const deleteTypeAnimals = async (id) => {
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/type/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('type_animal deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting type_animal:', error);
        throw error;
    }
};

///get all reviews
export const fetchReviewsData = async () => {
    try {
        const response = await api.get('/review', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
};

export const fetchReviewsById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/review/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching post data with ID ${id}:`, error);
        throw error;
    }
};

export const createReviewData = async (reviewData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post('/review', reviewData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post data:', error);
        throw error;
    }
};

export const updateReviewsData = async (id, reviewsData) => {
    console.log(id, reviewsData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/review/${id}`, reviewsData,{
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
export const deleteReviewsById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/review/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('review deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

// tenders api
export const fetchTenderData = async () => {
    try {
        const response = await api.get('/tender', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        throw error;
    }
};

export const fetchTenderById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/tender/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the specific tender data from the API
    } catch (error) {
        console.error(`Error fetching tender data with ID ${id}:`, error);
        throw error;
    }
};

export const createTenderData = async (formData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/tender`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Return the created tender data from the API
    } catch (error) {
        console.error('Error creating tender data:', error);
        throw error;
    }
};

export const updateTenderData = async (id, formData) => {
    console.log(id, formData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/tender/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',

            },
        });

        return response.data; // Return the updated tender data from the API
    } catch (error) {
        console.error('Error updating tender data:', error);
        throw error;
    }
};

export const deleteTenderById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token

    try {
        const response = await api.delete(`/tender/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
            },
        });
        console.log('Tender deleted response:', response.data);
        return response.data;  // Return the server response
    } catch (error) {
        console.error('Error deleting tender:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};

// type tenders api
export const fetchTypeTenderData = async () => {
    try {
        const response = await api.get('/type_tender', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        throw error;
    }
};

export const fetchTypeTenderById = async (id) => {
    try {
        const response = await api.get(`/type_tender/${id}`, {
        });
        return response.data; // Return the specific tender data from the API
    } catch (error) {
        console.error(`Error fetching tender data with ID ${id}:`, error);
        throw error;
    }
};

export const createTypeTenderData = async (typeTender) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/type_tender`, typeTender, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the created tender data from the API
    } catch (error) {
        console.error('Error creating tender data:', error);
        throw error;
    }
};

export const updateTypeTenderData = async (id, formData) => {
    console.log(id, formData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/type_tender/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the updated tender data from the API
    } catch (error) {
        console.error('Error updating tender data:', error);
        throw error;
    }
};

export const deleteTypeTenderById = async (id) => {
    console.log('delete id:', id);
    const token = getAuthCookie();  // Retrieve the token

    try {
        const response = await api.delete(`/type_tender/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
            },
        });
        console.log('Tender deleted response:', response.data);
        return response.data;  // Return the server response
    } catch (error) {
        console.error('Error deleting tender:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};

// Activities
export const fetchActivitiesData = async () => {
    try {
        const token = getAuthCookie();
        const response = await api.get('/activities_item/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching activities data:', error);
        throw error;
    }
};

export const fetchActivitiesById = async (id) => {
    try {
        const token = getAuthCookie();
        const response = await api.get(`/activities_item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching activities_item data with ID ${id}:`, error);
        throw error;
    }
};

export const createActivitiesData = async (formData) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/activities_item`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating activities_item data:', error);
        throw error;
    }
};

export const updateActivitiesData = async (formData, id) => {
    try {
        const token = getAuthCookie();
        const response = await api.put(`/activities_item/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating activities_item data:', error);
        throw error;
    }
};

export const deleteActivityById = async (id) => {
    const token = getAuthCookie();
    try {
        const response = await api.delete(`/activities_item/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the authorization token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete activities_item');
        }
        return response.json();  // Return the server response
    } catch (error) {
        console.error('Error deleting activities_item:', error);
        throw error;  // Rethrow error to handle it in the calling function
    }
};

// FAQ
export const createFAQData = async (tags) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/faq`, tags, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating faq data:', error);
        throw error;
    }
};

export const updateFAQData = async (id, typeAnimalData) => {
    console.log(id, typeAnimalData);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/faq/${id}`, typeAnimalData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating faq data:', error);
        throw error;
    }
};

export const getAllFAQ = async () => {
    try {
        const response = await api.get('/faq', {
        });
        return response.data;
    } catch (error) {
        console.error('Error getting faq:', error);
        throw error;
    }
};

export const deleteFAQ = async (id) => {
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/faq/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('faq deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting faq:', error);
        throw error;
    }
};

// week_hours
export const createWeekHours = async (newHour) => {
    try {
        const token = getAuthCookie();
        const response = await api.post(`/week_hours`, newHour, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating newHour data:', error);
        throw error;
    }
};

export const updateWeekHours = async (id, editHour) => {
    console.log(id, editHour);
    try {
        const token = getAuthCookie();
        const response = await api.put(`/week_hours/${id}`, editHour,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating editHour data:', error);
        throw error;
    }
};

export const fetchWeekHours = async () => {
    try {
        const response = await api.get('/week_hours', {
        });
        return response.data;
    } catch (error) {
        console.error('Error getting faq:', error);
        throw error;
    }
};

export const deleteWeekHours = async (id) => {
    const token = getAuthCookie();  // Retrieve the token
    try {
        const response = await api.delete(`/week_hours/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('faq deleted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting faq:', error);
        throw error;
    }
};

//emails
export const createEmailSubscribe = async (email) => {
    try {
        const response = await api.post(`/email`, email, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating newHour data:', error);
        throw error;
    }
};

