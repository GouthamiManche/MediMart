import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Loader from './Components/Loader';
import GotoTop from './Components/GotoTop';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Profile from './pages/Profile'
import { AuthProvider } from './Components/AuthProvider';

const Checkout = lazy(() => import('./pages/Checkout'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const Category = lazy(() => import('./pages/Category'));
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const OrderPlaced = lazy(() => import('./pages/OrderPlaced'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <Router>
        <div className='font-Poppins'>
          <Suspense fallback={<Loader />}>
           <Navbar cartItems={cartItems} setCartItems={setCartItems} totalItemsInCart={totalItemsInCart} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Shop/:pg?" element={<Shop />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/:category/:id" element={<Category />} />
              <Route exact path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="*" element={<ErrorPage />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/checkout" element={<Checkout cartItems={cartItems} />} />
              <Route exact path="/orderplaced" element={<OrderPlaced />} />
            </Routes>
            <GotoTop />
            <Footer />
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;