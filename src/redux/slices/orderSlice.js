import { toast } from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

import {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrder,
  processPayment,
} from "../apiCalls/orderAPIs";

const placeOrderThunk = createAsyncThunk("placeOrder", placeOrder);
const getOrdersThunk = createAsyncThunk("getOrders", getOrders);
const getAllOrdersThunk = createAsyncThunk("getAllOrders", getAllOrders);
const updateOrderThunk = createAsyncThunk("updateOrder", updateOrder);
const processPayementThunk = createAsyncThunk("processPayment", processPayment);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    validationError: null,
    orders: [],
    pagination: null,
    totalOrdersPrice: null,
  },

  extraReducers: function (builder) {
    // place order
    builder.addCase(placeOrderThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(placeOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(placeOrderThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

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

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // get orders

    builder.addCase(getOrdersThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
    });

    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      state.orders = action.payload.orderDetails.orders;
      state.pagination = action.payload.orderDetails.ordersPagination;

      let ordersTotalPrice = state.orders.reduce(
        (total, order) => total + order.productTotalPrice,
        0
      );

      state.totalOrdersPrice = ordersTotalPrice;

      // toast.dismiss();
      // toast.success(action.payload.message);
    });

    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        <Navigate to="/" />;
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // get all orders

    builder.addCase(getAllOrdersThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
    });

    builder.addCase(getAllOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      state.orders = action.payload.orderDetails.orders;

      state.pagination = action.payload.orderDetails.ordersPagination;

      let ordersTotalPrice = state.orders.reduce(
        (total, order) => total + order.productTotalPrice,
        0
      );

      state.totalOrdersPrice = ordersTotalPrice;

      // toast.dismiss();
      // toast.success(action.payload.message);
    });

    builder.addCase(getAllOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        <Navigate to="/" />;
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // update order

    builder.addCase(updateOrderThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(updateOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(updateOrderThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        <Navigate to="/" />;
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // make payment

    builder.addCase(processPayementThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("processing payment...");
    });

    builder.addCase(processPayementThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      <Navigate to="/" replace />;
      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(processPayementThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        <Navigate to="/" />;
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });
  },
});

export default orderSlice.reducer;
export {
  placeOrderThunk,
  getOrdersThunk,
  getAllOrdersThunk,
  updateOrderThunk,
  processPayementThunk,
};
