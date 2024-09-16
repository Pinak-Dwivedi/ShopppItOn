import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, lazy, Suspense, useState } from "react";
import { checkUserAuthentication } from "./redux/slices/userSlice";

import {
  getCart,
  addToCartThunk,
  getFromCartThunk,
} from "./redux/slices/cartSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Home = lazy(() => import("./components/home/Home"));
const Profile = lazy(() => import("./components/profile/Profile"));
const ResetPassword = lazy(() =>
  import("./components/resetPassword/ResetPassword")
);
const AddProduct = lazy(() => import("./components/addProduct/AddProduct"));
const UpdateProduct = lazy(() =>
  import("./components/updateProduct/UpdateProduct")
);
const Product = lazy(() => import("./components/product/Product"));
const ProductListing = lazy(() =>
  import("./components/productListing/ProductListing")
);
const Cart = lazy(() => import("./components/cart/Cart"));
const PlaceOrder = lazy(() => import("./components/placeOrder/PlaceOrder"));
const Orders = lazy(() => import("./components/orders/Orders"));
const Users = lazy(() => import("./components/users/Users"));
const NotFound = lazy(() => import("./components/notFound/NotFound"));

function App() {
  const shouldMakeCheckAuthenticationCallAndGetCart = useRef(true);
  const shouldCallCartUpdateAPIs = useRef(true);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems, cartItemsCount } = useSelector((state) => state.cart);

  const [stripeAPIKey, setStripeAPIKey] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_API_KEY)
  );

  // check user authentication

  useEffect(() => {
    if (shouldMakeCheckAuthenticationCallAndGetCart.current === true) {
      dispatch(checkUserAuthentication());
      dispatch(getCart());
      setStripeAPIKey((prev) => prev);

      return () => {
        shouldMakeCheckAuthenticationCallAndGetCart.current = false;
      };
    }
  }, [dispatch]);

  // get or set cart when authenticated
  useEffect(() => {
    if (shouldCallCartUpdateAPIs.current === true) {
      if (isAuthenticated && cartItemsCount === 0) {
        dispatch(getFromCartThunk());
        return () => {
          shouldCallCartUpdateAPIs.current = false;
        };
      } else if (isAuthenticated && cartItemsCount !== 0) {
        dispatch(addToCartThunk(cartItems));
        return () => {
          shouldCallCartUpdateAPIs.current = false;
        };
      }
    }
  }, [dispatch, isAuthenticated, cartItems, cartItemsCount]);

  // prevents right click
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/product/:name" element={<Product />} />
          <Route path="/productlisting" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          {isAuthenticated && <Route path="/orders" element={<Orders />} />}
          <Route path="/users" element={<Users />} />

          {stripeAPIKey != null ? (
            <Route
              path="/placeorder"
              element={
                isAuthenticated ? (
                  <Elements stripe={stripeAPIKey}>
                    <PlaceOrder />
                  </Elements>
                ) : (
                  ""
                )
              }
            />
          ) : null}

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
