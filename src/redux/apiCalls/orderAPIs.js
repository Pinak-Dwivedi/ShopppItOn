import { toast } from "react-hot-toast";

export async function placeOrder(orderData, { rejectWithValue }) {
  try {
    const {
      address,
      pinCode,
      city,
      state,
      country,
      mobile,
      setShowPaymentForm,
    } = orderData;

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        pinCode,
        city,
        state,
        country,
        mobile,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setShowPaymentForm(true);
      return data;
    }

    throw data;
  } catch (error) {
    if (error.success === false) throw rejectWithValue(error);

    throw new Error("Request Failed!😔");
  }
}

export async function getOrders(query, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/order?${query}`,
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

export async function getAllOrders(query, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/order/getAllOrders?${query}`,
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

export async function updateOrder(orderData, { rejectWithValue }) {
  try {
    const { orderId, orderStatus } = orderData;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/order/${orderId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus }),
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

export async function processPayment(processPaymentData, { rejectWithValue }) {
  try {
    const { paymentDetails, billingDetails, clearCartOnOrderComplete } =
      processPaymentData;

    const { stripe, elements, CardNumberElement, amount } = paymentDetails;

    const { name, email, address, pinCode, city, state, country } =
      billingDetails;

    let amountInPaise = Math.round(amount * 100);

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/order/processPayment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      if (stripe != null || elements != null) {
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name,
              email,
              address: {
                line1: address,
                city,
                state,
                postal_code: pinCode,
                country,
              },
            },
          },
        });

        if (result.paymentIntent.status === "succeeded") {
          const paymentId = result.paymentIntent.id;

          // payment successful message
          toast.dismiss();
          toast.success(data.message);

          const confirmOrderResult = await confirmOrder(paymentId);

          if (confirmOrderResult.success) {
            clearCartOnOrderComplete();
            return confirmOrderResult;
          }

          throw confirmOrderResult;
        }

        throw result;
      }
    }

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);

    throw new Error("Request Failed!😔");
  }
}

export async function confirmOrder(paymentId) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/order/confirmOrder`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      }
    );

    const data = await res.json();

    if (data.success) return data;

    throw data;
  } catch (error) {
    if (error.success === false) throw error;

    throw new Error("Request Failed!😔");
  }
}
