import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProduct,
  getProductReviews,
  createProduct,
  updateProduct,
  createProductReview,
} from "../apiCalls/productAPIs";
import toast from "react-hot-toast";

const getProductsThunk = createAsyncThunk("getProducts", getProducts);
const getProductThunk = createAsyncThunk("getproduct", getProduct);
const getProductReviewsThunk = createAsyncThunk(
  "getProductReviews",
  getProductReviews
);
const createProductThunk = createAsyncThunk("createProduct", createProduct);
const updateProductThunk = createAsyncThunk("updateProduct", updateProduct);
const createProductReviewThunk = createAsyncThunk(
  "createProductReview",
  createProductReview
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    validationError: null,
    searchQuery: {
      search: "",
      filter: "",
      page: "",
    },
    latestProducts: null,
    products: null,
    pagination: null,

    productDetails: null,
    reviewsDetails: null,
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    sortProducts(state, action) {
      if (state.products != null) {
        state.isLoading = true;

        let newSortedProducts = state.products;

        switch (action.payload) {
          case "priceHighToLow":
            state.products = newSortedProducts.sort(
              (second, first) => first.productPrice - second.productPrice
            );
            state.isLoading = false;
            break;
          case "priceLowToHigh":
            state.products = newSortedProducts.sort(
              (second, first) => second.productPrice - first.productPrice
            );
            state.isLoading = false;
            break;

          case "newestFirst":
            state.products = newSortedProducts.sort(
              (second, first) => first.createdAtDate - second.createdAtDate
            );
            state.isLoading = false;
            break;

          default:
            return state.products;
        }
      }
    },
  },

  extraReducers: function (builder) {
    // get products

    builder.addCase(getProductsThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
    });

    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      if (action?.payload?.latestProducts != null)
        state.latestProducts = action.payload.latestProducts;

      state.products = action.payload.products;

      if (action?.payload?.pagination != null)
        state.pagination = action.payload.pagination;

      // toast.dismiss();
      // toast.success(action.payload.message);
    });

    builder.addCase(getProductsThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // get product

    builder.addCase(getProductThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;
      toast.dismiss();
    });

    builder.addCase(getProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      state.productDetails = action.payload.productDetails;

      if (action.payload.reviewsDetails != null)
        state.reviewsDetails = action.payload.reviewsDetails;
    });

    builder.addCase(getProductThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.success === false) {
        toast.dismiss();
        toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // get product reviews

    builder.addCase(getProductReviewsThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;
      toast.dismiss();
    });

    builder.addCase(getProductReviewsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      state.reviewsDetails = action.payload.reviewsDetails;
    });

    builder.addCase(getProductReviewsThunk.rejected, (state, action) => {
      state.isLoading = false;

      if (action?.payload?.success === false) {
        // toast.dismiss();
        // toast.error(action.payload.message);
        return;
      }

      // toast.dismiss();
      // toast.error(action.error.message);
    });

    // create product

    builder.addCase(createProductThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(createProductThunk.rejected, (state, action) => {
      state.isLoading = false;

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

    // update product

    builder.addCase(updateProductThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(updateProductThunk.rejected, (state, action) => {
      state.isLoading = false;

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

    // create product review

    builder.addCase(createProductReviewThunk.pending, (state, action) => {
      state.isLoading = true;
      state.validationError = null;

      toast.dismiss();
      toast.loading("wait...");
    });

    builder.addCase(createProductReviewThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationError = null;

      toast.dismiss();
      toast.success(action.payload.message);
    });

    builder.addCase(createProductReviewThunk.rejected, (state, action) => {
      state.isLoading = false;

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

export default productSlice.reducer;
export {
  getProductsThunk,
  getProductThunk,
  getProductReviewsThunk,
  createProductThunk,
  updateProductThunk,
  createProductReviewThunk,
};
export const { setSearchQuery, sortProducts } = productSlice.actions;
