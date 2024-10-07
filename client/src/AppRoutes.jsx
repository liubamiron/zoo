
import HomePage from "./pages/HomePage.jsx";

import Auth from "./pages/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Layout from "./components/Layout";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import AdminAnimals from "./pages/admin/AdminAnimals";
import AdminAnimalsDetails from "./pages/admin/AdminAnimalsDetails";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminNews from "./pages/admin/News";
import Events from "./pages/admin/Events";
import EventCreate from "./pages/admin/EventCreate";
import EventEdit from "./pages/admin/EventEdit";
import AdminPosts from "./pages/admin/Posts";
import AdminTenders from "./pages/admin/Tenders";
import AdminReviews from "./pages/admin/Reviews";
import AdminActivities from "./pages/admin/Activities";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminAnimalsCreate from "./pages/admin/AdminAnimalsCreate";
import AdminHomePageEdit from "./pages/admin/AdminHomePageEdit";
import PostCreate from "./pages/admin/PostCreate";
import PostEdit from "./pages/admin/PostEdit";
import TenderCreate from "./pages/admin/TenderCreate";
import TenderEdit from "./pages/admin/TenderEdit";
import ReviewCreate from "./pages/admin/ReviewCreate";
import ReviewEdit from "./pages/admin/ReviewEdit";
import ActivitiesCreate from "./pages/admin/ActivitiesCreate";
import ActivitiesEdit from "./pages/admin/ActivitiesEdit";
import NewsCreate from "./pages/admin/NewsCreate.jsx";
import NewsEdit from "./pages/admin/NewsEdit.jsx";
import Tags from "./pages/admin/Tags.jsx";
import TypeAnimals from "./pages/admin/TypeAnimals.jsx";
import FAQ from "./pages/admin/FAQ.jsx";
import About from "./pages/About.jsx";
import Animals from "./pages/Animals.jsx";
import Animal from "./pages/Animal.jsx";
import Gallery from "./pages/Gallery.jsx";
import PageEvents from "./pages/PageEvents.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import TendersPage from "./pages/TendersPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DonationPage from "./pages/DonationPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import TypeTender from "./pages/admin/TypeTender.jsx";
import WeekHours from "./pages/admin/WeekHours.jsx";
import Cookies from "js-cookie";
import {useState} from "react";

const ProtectedRoute = () => {
    // Get the token from cookies
    const token = Cookies.get('jwtToken');
    const [errorMessage, setErrorMessage] = useState('');

    // If no token is found, redirect to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        // Decode the JWT token to check the role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        // Check if the role is 'ADMIN'
        if (decodedToken.role !== 'ADMIN') {
            setErrorMessage('You are not authorized to access this page.');
            return (
                <div>
                    <h1>{errorMessage}</h1>
                    <Navigate to="/" replace />
                </div>
            );
        }
    } catch (error) {
        console.error('Error decoding token', error);
        return <Navigate to="/login" replace />;
    }

    // If everything is valid, render the requested route
    return <Outlet />;
};



function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage/>} />
                <Route path="/about" element={<About />} />
                <Route path="/animals" element={<Animals />} />
                <Route path="/animals/:id" element={<Animal />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/events" element={<PageEvents />} />
                <Route path="/news" element={<PostsPage />} />
                <Route path="/news/:id" element={<PostPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/tender" element={<TendersPage />} />
                <Route path="/contacts" element={<ContactUs />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="*" element={<NotFoundPage/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Auth />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="" element={<AdminLayout />}>
                {/*<Route path="/admin" element={<AdminLayout />}>*/}
                    <Route path="main_page" element={<AdminHomePage />} />
                    <Route path="main_page/:id" element={<AdminHomePageEdit />} />
                    <Route path="animals" element={<AdminAnimals />} />
                    <Route path="animals/:id" element={<AdminAnimalsDetails />} />
                    <Route path="animals/create" element={<AdminAnimalsCreate />} />
                    <Route path="news" element={<AdminNews />} />
                    <Route path="news/create" element={<NewsCreate />} />
                    <Route path="news/:id" element={<NewsEdit />} />
                    <Route path="events" element={<Events />} />
                    <Route path="events/create" element={<EventCreate />} />
                    <Route path="events/:id" element={<EventEdit />} />
                    <Route path="posts" element={<AdminPosts />} />
                    <Route path="posts/create" element={<PostCreate />} />
                    <Route path="posts/:id" element={<PostEdit />} />
                    <Route path="tenders" element={<AdminTenders />} />
                    <Route path="tenders/create" element={<TenderCreate />} />
                    <Route path="tenders/:id" element={<TenderEdit />} />
                    <Route path="type_tenders" element={<TypeTender />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="reviews/create" element={<ReviewCreate />} />
                    <Route path="reviews/:id" element={<ReviewEdit />} />
                    <Route path="activities" element={<AdminActivities />} />
                    <Route path="activities/create" element={<ActivitiesCreate />} />
                    <Route path="activities/:id" element={<ActivitiesEdit />} />
                    <Route path="tags" element={<Tags />} />
                    <Route path="week_hours" element={<WeekHours />} />
                    <Route path="type_animals" element={<TypeAnimals />} />
                    <Route path="faq" element={<FAQ />} />
                </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;