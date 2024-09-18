import { Outlet } from 'react-router-dom';
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

const AdminLayout = () => {
    return (

        <div>
            <AdminNavbar />
            <div style={{ display: 'flex' }}>
                <AdminSidebar />
               <div style={{ flex: 1, padding: '20px' }}>
                   <h2 className="text-center">Welcome to the Admin Dashboard</h2>
                   <br/>
                   <br/>
                   <main>
                        <Outlet /> {/* Renders child routes */}
                    </main>
                 </div>
             </div>
        </div>
    );
};

export default AdminLayout;
