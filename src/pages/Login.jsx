import React, { useState } from 'react';

function Login() {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE_URL = "https://my-backend-app-latest-1-7wbp.onrender.com/api/auth";

  const fetchWithTimeout = (url, options, timeout = 15000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Server timeout")), timeout)
      )
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (state === "signup" && (!name || !email || !password)) {
      alert("Please fill all fields!");
      return;
    }

    if (state === "login" && (!email || !password)) {
      alert("Please enter email and password!");
      return;
    }

    setLoading(true);
    setMessage("Server may be waking up... Please wait 20-30 seconds.");

    try {
      const endpoint = state === "signup" ? "/signup" : "/login";

      const res = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          state === "signup"
            ? { name, email, password }
            : { email, password }
        ),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Something went wrong");
      }

      const data = await res.json();

      // Store only JWT or user session (NOT password)
      localStorage.setItem("token", data.token);

      setMessage(state === "signup"
        ? "Account created successfully!"
        : "Login successful!"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (err) {
      console.error(err);
      setMessage("Server is waking up or unavailable. Please try again in a few seconds.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 items-start p-8 m-auto min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-800 text-sm shadow-lg">
        
        <p className="text-2xl font-semibold">
          {state === 'signup' ? "Create Account" : "Login"}
        </p>

        <p>Please {state === "signup" ? "sign up" : "log in"} to book appointment</p>

        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-400 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {message && (
          <p className="text-sm text-blue-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 mt-1 rounded text-base text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 cursor-pointer"
          }`}
        >
          {loading
            ? "Please wait..."
            : state === "signup"
              ? "Create Account"
              : "Login"}
        </button>

        {state === "signup" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("signup")}
              className="text-blue-600 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
