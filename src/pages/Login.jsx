import React, { useState } from 'react';

function Login() {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const API_BASE_URL = " https://my-backend-app-latest-1-7wbp.onrender.com/api/auth"//https://doctor-backend-5-2r6g.onrender.com/api/auth";

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (state === "signup" && (!name || !email || !password)) {
      alert("Please fill all fields!");
      return;
    }
    if (state === "login" && (!email || !password)) {
      alert("Please enter email and password!");
      return;
    }

    try {
      let res;

      if (state === "signup") {
        // Try signup via backend
        try {
          res = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          if (!res.ok) throw new Error(await res.text());

          const data = await res.json();
          // Save user in localStorage as fallback
          let users = JSON.parse(localStorage.getItem("users") || "[]");
          users.push(data);
          localStorage.setItem("users", JSON.stringify(users));

          localStorage.setItem("loggedInUser", JSON.stringify(data));
          alert("Account created successfully!");
          window.location.href = "/";
        } catch (err) {
          console.warn("Backend signup failed, using localStorage fallback:", err);

          // Save user in localStorage only
          let users = JSON.parse(localStorage.getItem("users") || "[]");
          const existingUser = users.find(u => u.email === email);
          if (existingUser) {
            alert("User already exists locally!");
            return;
          }
          const localUser = { name, email, password };
          users.push(localUser);
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("loggedInUser", JSON.stringify(localUser));
          alert("Account created locally (server offline)!");
          window.location.href = "/";
        }

      } else {
        // Login
        try {
          res = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error(await res.text());

          const data = await res.json();
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          alert("Login successful!");
          window.location.href = "/";

        } catch (err) {
          console.warn("Backend login failed, trying localStorage:", err);

          // Fallback: check localStorage users
          let users = JSON.parse(localStorage.getItem("users") || "[]");
          const localUser = users.find(u => u.email === email && u.password === password);
          if (localUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(localUser));
            alert("Login successful locally (server offline)!");
            window.location.href = "/";
          } else {
            alert("Server offline and user not found locally!");
          }
        }
      }

    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleLogin}>
      <div className="flex flex-col gap-3 items-start p-8 m-auto min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-800 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'signup' ? "Create Account" : "Login"}
        </p>

        <p>Please {state === "signup" ? "sign up" : "log in"} to book appointment</p>

        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-400 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 cursor-pointer text-white w-full p-2 mt-1 rounded text-base">
          {state === 'signup' ? "Create Account" : "Login"}
        </button>

        {state === "signup" ? (
          <p>Already have account? <span onClick={() => setState("login")} className="text-blue-600 underline cursor-pointer">Login here</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState("signup")} className="text-blue-600 underline cursor-pointer">Click here</span></p>
        )}
      </div>
    </form>
  );
}

export default Login;
