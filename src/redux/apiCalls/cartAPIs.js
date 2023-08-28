export async function addToCart(cartData, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/cart/addToCart`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
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

export async function getFromCart(temp = null, { rejectWithValue }) {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);
    throw new Error("Request Failed!😔");
  }
}
