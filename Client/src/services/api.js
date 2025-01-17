const API_URL = "http://localhost:3000";

export async function CreateAccount({ email, password, username }) {
  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }
}

export async function LoginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to login");
    }

    const data = await response.json();

    // Store token in localStorage
    localStorage.setItem("token", data.token);

    // Store user data
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(data.token, data.user);
    return {
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
