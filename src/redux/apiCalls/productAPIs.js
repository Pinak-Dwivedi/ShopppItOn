import convertImgToBase64 from "../../utils/convertFiletoBase64";

export async function getProducts(query, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products?${query}`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}

export async function getProduct(getProductInfo, { rejectWithValue }) {
  try {
    const { productId, query } = getProductInfo;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products/${productId}?${query}`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}

export async function getProductReviews(
  getProductReviewsInfo,
  { rejectWithValue }
) {
  try {
    const { productId, query } = getProductReviewsInfo;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products/review/${productId}?${query}`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}

export async function createProduct(productData, { rejectWithValue }) {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      productImage1,
      productImage2,
      productImage3,
    } = productData;

    let productImage1InBase64;
    let productImage2InBase64;
    let productImage3InBase64;

    if (
      productImage1 != null &&
      productImage2 != null &&
      productImage3 != null
    ) {
      productImage1InBase64 = await convertImgToBase64(productImage1);
      productImage2InBase64 = await convertImgToBase64(productImage2);
      productImage3InBase64 = await convertImgToBase64(productImage3);
    }

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        stock,
        category,
        productImages: [
          productImage1InBase64,
          productImage2InBase64,
          productImage3InBase64,
        ],
      }),
    });

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}

export async function updateProduct(productData, { rejectWithValue }) {
  try {
    const {
      id,
      name,
      description,
      price,
      stock,
      category,
      productImage1,
      productImage2,
      productImage3,
    } = productData;

    let productImage1InBase64;
    let productImage2InBase64;
    let productImage3InBase64;

    if (
      productImage1 != null &&
      productImage2 != null &&
      productImage3 != null
    ) {
      productImage1InBase64 = await convertImgToBase64(productImage1);
      productImage2InBase64 = await convertImgToBase64(productImage2);
      productImage3InBase64 = await convertImgToBase64(productImage3);
    }

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          category,
          productImages: [
            productImage1InBase64,
            productImage2InBase64,
            productImage3InBase64,
          ],
        }),
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}

export async function createProductReview(
  createProductReviewInfo,
  { rejectWithValue }
) {
  try {
    const { productId, reviewData } = createProductReviewInfo;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products/review/${productId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(reviewData),
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);

    throw new Error("Request Failed!😔");
  }
}
