import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { addToCart, getFromCart } from "../apiCalls/cartAPIs";

const addToCartThunk = createAsyncThunk("addToCart", addToCart);
const getFromCartThunk = createAsyncThunk("getFromCart", getFromCart);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartItems: [],
    cartTotal: 0,
    cartItemsCount: 0,
  },

  reducers: {
    setCart(state, action) {
      state.isLoading = true;

      toast.dismiss();
      toast.loading("wait...");

      // if product already exists update it otherwise add to cart

      let quantityUpdated = {
        status: false,
        value: null,
      };

      // if cart is empty
      if (state.cartItemsCount === 0) state.cartItems.push(action.payload);
      // check if this product already exists in cart then update it's quantity and total price
      else {
        let found = state.cartItems.find(
          (item) => item.productId === action.payload.productId
        );

        if (found != null) {
          let newCartItems = state.cartItems.map((item) => {
            if (item === found) {
              item.productQuantity += action.payload.productQuantity;
              item.productTotalPrice = item.productPrice * item.productQuantity;

              quantityUpdated.status = true;
              quantityUpdated.value = item.productQuantity;
            }

            return item;
          });

          state.cartItems = newCartItems;
        } else {
          state.cartItems.push(action.payload);
        }
      }

      // set cart total and cart items count

      let cartTotal = 0,
        cartItemsCount = 0;

      state.cartItems.forEach((item) => {
        cartTotal += item.productTotalPrice;
        cartItemsCount += item.productQuantity;
      });

      state.cartTotal = cartTotal;
      state.cartItemsCount = cartItemsCount;

      // add to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      localStorage.setItem(
        "cartInfo",
        JSON.stringify({
          cartTotal: state.cartTotal,
          cartItemsCount: state.cartItemsCount,
        })
      );

      state.isLoading = false;
      toast.dismiss();

      if (quantityUpdated.status)
        toast.success(
          `${action.payload.productName} quantity updated to ${quantityUpdated.value}`
        );
      else toast.success(`${action.payload.productName} added to cart`);
    },

    updateCart(state, action) {
      state.isLoading = true;
      toast.dismiss();
      toast.loading("wait...");

      if (action.payload.productStock === action.payload.productQuantity) {
        toast.dismiss();
        toast(`Only ${action.payload.productStock} in stock`, { icon: "⚠️" });
      }

      let newCartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload.productId) {
          item.productQuantity = action.payload.productQuantity;
          item.productTotalPrice = item.productPrice * item.productQuantity;
        }

        return item;
      });

      state.cartItems = newCartItems;

      // set cart total and cart items count

      let cartTotal = 0,
        cartItemsCount = 0;

      state.cartItems.forEach((item) => {
        cartTotal += item.productTotalPrice;
        cartItemsCount += item.productQuantity;
      });

      state.cartTotal = cartTotal;
      state.cartItemsCount = cartItemsCount;

      // add to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      localStorage.setItem(
        "cartInfo",
        JSON.stringify({
          cartTotal: state.cartTotal,
          cartItemsCount: state.cartItemsCount,
        })
      );

      state.isLoading = false;
      toast.dismiss();

      toast.success(
        `${action.payload.productName} quantity updated to ${action.payload.productQuantity}`
      );
    },

    getCart(state) {
      state.isLoading = true;

      // get from local storage
      let cartItems =
        localStorage.getItem("cartItems") != null
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];

      state.cartItems = cartItems;

      let cartInfo =
        localStorage.getItem("cartInfo") != null
          ? JSON.parse(localStorage.getItem("cartInfo"))
          : { cartTotal: 0, cartItemsCount: 0 };

      state.cartTotal = cartInfo?.cartTotal;
      state.cartItemsCount = cartInfo?.cartItemsCount;

      state.isLoading = false;
    },

    removeProductFromCart(state, action) {
      let newCartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );

      state.cartItems = newCartItems;

      // set cart total and cart items count

      let cartTotal = 0,
        cartItemsCount = 0;

      state.cartItems.forEach((item) => {
        cartTotal += item.productTotalPrice;
        cartItemsCount += item.productQuantity;
      });

      state.cartTotal = cartTotal;
      state.cartItemsCount = cartItemsCount;

      // add to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      localStorage.setItem(
        "cartInfo",
        JSON.stringify({
          cartTotal: state.cartTotal,
          cartItemsCount: state.cartItemsCount,
        })
      );

      state.isLoading = false;
      toast.dismiss();
      toast.success(`${action.payload.productName} removed from cart`);
    },

    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotal = 0;
      state.cartItemsCount = 0;

      // clear local storage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartInfo");
    },
  },

  extraReducers: function (builder) {
    // add to cart
    builder.addCase(addToCartThunk.pending, (state, action) => {
      state.isLoading = true;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(addToCartThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        state.isAuthenticated = false;
        state.user = null;

        <Navigate to="/" />;

        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      toast.dismiss();
      toast.error(action.error.message);
    });

    // get from cart

    builder.addCase(getFromCartThunk.pending, (state, action) => {
      state.isLoading = true;

      // toast.dismiss();
      // toast.loading("wait...");
    });

    builder.addCase(getFromCartThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload.cartItems;

      // set cart total and cart items count

      let cartTotal = 0,
        cartItemsCount = 0;

      state.cartItems.forEach((item) => {
        cartTotal += item.productTotalPrice;
        cartItemsCount += item.productQuantity;
      });

      state.cartTotal = cartTotal;
      state.cartItemsCount = cartItemsCount;

      // add to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      localStorage.setItem(
        "cartInfo",
        JSON.stringify({
          cartTotal: state.cartTotal,
          cartItemsCount: state.cartItemsCount,
        })
      );

      state.isLoading = false;
    });

    builder.addCase(getFromCartThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.success === false) {
        // toast.dismiss();
        // toast.error(action.payload.message);
        return;
      }

      toast.dismiss();
      toast.error(action.error.message);
    });
  },
});

export default cartSlice.reducer;
export const {
  setCart,
  updateCart,
  getCart,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;
export { addToCartThunk, getFromCartThunk };
