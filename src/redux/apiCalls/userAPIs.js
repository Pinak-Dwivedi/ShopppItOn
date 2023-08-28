import convertImgToBase64 from "../../utils/convertFiletoBase64";

export async function login(userData, { rejectWithValue }) {
  const { email, password, closeLogin } = userData;
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      closeLogin();
      return data;
    }

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);

    closeLogin();
    throw new Error("Request Failed!😔");
  }
}

export async function register(userData, { rejectWithValue }) {
  const {
    username,
    email,
    password,
    confirmPassword,
    profileImage,
    closeSignUp,
    signUpForm,
  } = userData;

  let imageInBase64 = null;

  if (profileImage != null) {
    imageInBase64 = await convertImgToBase64(profileImage);
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          profileImage: imageInBase64,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      closeSignUp();
      signUpForm.reset();
      return data;
    }

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);

    closeSignUp();
    signUpForm.reset();
    throw new Error("Request Failed!😔");
  }
}

export async function update(userData, { rejectWithValue }) {
  try {
    const { userId, username, email, profileImage } = userData;

    let imageInBase64 = null;

    if (profileImage != null && typeof profileImage !== "string") {
      imageInBase64 = await convertImgToBase64(profileImage);
    }

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/update/${userId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          profileImage: imageInBase64,
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

export async function logout(userData = null, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/logout`,
      {
        method: "POST",
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

export async function checkIfAuthenticated(param = null, { rejectWithValue }) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/checkIfAuthenticated`,
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

export async function getUsers(param = null, { rejectWithValue }) {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
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

export async function forgotPassword(userData, { rejectWithValue }) {
  const { email, closeforgotPassword } = userData;
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/forgotPassword`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      closeforgotPassword();
      return data;
    }

    throw data;
  } catch (error) {
    if (error.success === false) return rejectWithValue(error);

    closeforgotPassword();
    throw new Error("Request Failed!😔");
  }
}

export async function resetPassword(userData, { rejectWithValue }) {
  try {
    const { password, confirmPassword, id, token } = userData;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/resetPassword/${id}/${token}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword,
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
