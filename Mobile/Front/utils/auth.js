import apiClient from "./api";

export const login = async (phoneNumber, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      phone_number: phoneNumber,
      password: password,
    });
    return response.data; // Backend returns token or user data
  } catch (error) {
    throw (
      error.response?.data || { message: "An error occurred while logging in." }
    );
  }
};
