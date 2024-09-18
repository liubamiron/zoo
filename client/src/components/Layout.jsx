import React from 'react';
import NavbarPage from './NavbarPage.jsx';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
    const location = useLocation();
    // const isAdminRoute = location.pathname === '/admin';
    const adminCategoryPaths = ['/admin',
        '/admin/animals',
        '/admin/animals/:id',
        '/admin/events',
        '/admin/news',
        '/admin/reviews',
        '/admin/reviews/:id',
        '/admin/posts',
        '/admin/tenders',
        '/admin/tenders/:id',
        '/admin/main_page',
    ];

    // Check if the current path starts with any of the admin paths
    const isAdminCategoryPage = adminCategoryPaths.some((path) =>
        location.pathname.startsWith(path)
    );

    return (
        <div>
            {!isAdminCategoryPage && <NavbarPage />}
            <Outlet />
            {!isAdminCategoryPage && <Footer />}
        </div>
    );
}

export default Layout;
