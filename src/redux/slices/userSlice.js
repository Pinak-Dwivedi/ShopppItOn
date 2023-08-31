import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  login,
  register,
  update,
  logout,
  checkIfAuthenticated,
  getUsers,
  forgotPassword,
  resetPassword,
} from "../apiCalls/userAPIs";

import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const loginUser = createAsyncThunk("loginUser", login);
const registerUser = createAsyncThunk("registerUser", register);
const updateUser = createAsyncThunk("updateUser", update);
const logoutUser = createAsyncThunk("logoutUser", logout);
const checkUserAuthentication = createAsyncThunk(
  "checkUserAuthentication",
  checkIfAuthenticated
);
const getAllUsers = createAsyncThunk("getUsers", getUsers);
const forgotUserPassword = createAsyncThunk(
  "forgotUserPassword",
  forgotPassword
);
const resetUserPassword = createAsyncThunk("resetUserPassword", resetPassword);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    validationError: null,
    user: null,
    users: null,
  },

  reducers: {
    clearLoadingAndValidationError: (state) => {
      state.isLoading = false;
      state.validationError = null;
    },
  },

  extraReducers: function (builder) {
    // login

    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.validationError = null;
      state.user = action.payload.user;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // register

    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.validationError = null;
      state.user = action.payload.user;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // update

    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.validationError = null;
      state.user = action.payload.user;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        state.isAuthenticated = false;
        state.user = null;

        <Navigate to="/" replace />;

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

    // logout

    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("");
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.validationError = null;
      state.user = null;

      <Navigate to="/" replace />;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        state.isAuthenticated = false;
        state.user = null;

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

    // check if authenticated

    builder.addCase(checkUserAuthentication.pending, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.validationError = null;
      state.user = null;
    });

    builder.addCase(checkUserAuthentication.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.validationError = null;
      state.user = action.payload.user;
    });

    builder.addCase(checkUserAuthentication.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.validationError = null;
      state.user = null;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        state.isAuthenticated = false;
        state.user = null;

        <Navigate to="/" replace />;

        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }
    });

    // get all users

    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;
      state.users = null;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;
      state.users = action.payload.users;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.validationError = null;
      state.users = null;

      if (
        action?.payload?.success === false &&
        action?.payload?.message === "Login First"
      ) {
        state.isAuthenticated = false;
        state.user = null;

        <Navigate to="/" replace />;

        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }
    });

    // forgot password

    builder.addCase(forgotUserPassword.pending, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.validationError = null;
      state.user = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(forgotUserPassword.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.validationError = null;
      state.user = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(forgotUserPassword.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // reset password

    builder.addCase(resetUserPassword.pending, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.validationError = null;
      state.user = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(resetUserPassword.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.validationError = null;
      state.user = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(resetUserPassword.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;

      if (action?.payload?.validationError != null)
        state.validationError = action.payload.validationError;

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

export default userSlice.reducer;
export const { clearLoadingAndValidationError } = userSlice.actions;
export {
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  checkUserAuthentication,
  getAllUsers,
  forgotUserPassword,
  resetUserPassword,
};
