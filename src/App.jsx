import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/Order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import ProductInfo from './components/productInfo/ProductInfo';
import "./App.css";
import "./font/OMEGLE.ttf";
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, fireDB } from './firebase/FirebaseConfig';
import MyContext from './context/data/myContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AllProducts from './pages/allproducts/AllProducts';


const App = () => {
  function getUserId() {
    const [id, setId] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setId(user.uid);
        } else {
          console.log("Not in the log");
        }
      });

      // Cleanup the subscription on unmount
      return () => unsubscribe();
    }, []);
    console.log(id);
    return id;
  }

  const id = getUserId();

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
          <Order />} />
          <Route path="/cart" element={
          <ProtectedRoutes><Cart></Cart></ProtectedRoutes>
          } />
          <Route path="/dashboard" element={
          <ProtectedRoutesForAdmin><Dashboard></Dashboard></ProtectedRoutesForAdmin>} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={
          <ProtectedRoutesForAdmin><AddProduct/></ProtectedRoutesForAdmin>} />
          <Route path="/updateproduct" element={
          <ProtectedRoutesForAdmin><UpdateProduct/></ProtectedRoutesForAdmin>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/allproducts" element={<AllProducts/>} />
          {/* <Route path="/signup" element={<Signup/>} /> */}

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer></ToastContainer>
      </Router>
    </MyState>

  )
}

const ProtectedRoutes = ({ children }) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the login page if not logged in.
        navigate('/login');
      }
      console.log(user)
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Render the protected content or null if not authenticated.
  return children;
};

export const ProtectedRoutesForAdmin= ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user.email!='shubhamspethe@coep.sveri.ac.in') {
        // Redirect to the login page if not logged in.
        navigate('/login');
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Render the protected content or null if not authenticated.
  return children;
};




// export const ProtectedRoutesForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem('user'));
//   console.log(admin.user.email);

//   if (admin.user.email === 'shubhamspethe@coep.sveri.ac.in') {
//     // Render the content for admin.
//     return <>{children}</>;
//   } else {
//     // Redirect to the login page if not an admin.
//     return <Navigate to={'/login'}/>
//   }
// };

export default App;