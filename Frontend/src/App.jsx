import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useMemo } from 'react'; // Importing useMemo
import Loader from './Components/Loader';
import GotoTop from './Components/GotoTop';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Profile from './pages/Profile';
import { AuthProvider } from './Components/AuthProvider';

const Checkout = lazy(() => import('./pages/Checkout'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const Category = lazy(() => import('./pages/Category'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const OrderPlaced = lazy(() => import('./pages/OrderPlaced'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

function App() {
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   setCartItems(getCartItemsFromLocalStorage());
  // }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, []);

  const getCartItemsFromLocalStorage = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  };

  const totalItemsInCart = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <AuthProvider>
      <Router>
        <div className='font-Poppins'>
          <Suspense fallback={<Loader />}>
            <Navbar
              cartItems={cartItems}
              setCartItems={(updatedCartItems) => setCartItems(updatedCartItems)}
              totalItemsInCart={totalItemsInCart}
            />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Shop/:pg?" element={<Shop />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/:category/:id" element={<Category />} />
              <Route
                exact
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    setCartItems={(updatedCartItems) => setCartItems(updatedCartItems)}
                  />
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="*" element={<ErrorPage />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/checkout" element={<Checkout cartItems={cartItems} />} />
              <Route exact path="/orderplaced" element={<OrderPlaced />} />
              <Route exact path="/paymentpage" element={<PaymentPage />} />
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
