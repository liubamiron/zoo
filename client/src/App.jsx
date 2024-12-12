
import AppRoutes from "./AppRoutes";
import {useEffect} from 'react';
import { useLocation} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {


      function ScrollToTop() {
          const {pathname} = useLocation();

          useEffect(() => {
              window.scrollTo(0, 0);
          }, [pathname]);

          return null;
      }



    return (
        <>
            <AppRoutes />
            <ScrollToTop/>
        </>

  )
}

export default App
