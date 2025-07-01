import React, { useState } from 'react';

function Login() {
  const [state, setState] = useState("sign up");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (state === "sign up") {
      const exists = users.find(user => user.email === email);
      if (exists) return alert("Email already registered.");

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      alert("Account created successfully!");
    } else {
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) return alert("Invalid credentials");

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
    }

    window.location.href = "/";
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleLogin}>
      <div className="flex flex-col gap-3 items-start p-8 m-auto min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-800 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'sign up' ? "Create Account" : "Login"}</p>
        <p>Please {state === "sign up" ? "sign up" : "log in"} to book appointment</p>

        {state === "sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-400 rounded w-full p-2 mt-1" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-400 rounded w-full p-2 mt-1" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-400 rounded w-full p-2 mt-1" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type="submit" className="bg-blue-600 cursor-pointer text-white w-full p-2 mt-1 rounded text-base">
          {state === 'sign up' ? "Create Account" : "Login"}
        </button>

        {state === "sign up" ? (
          <p>Already have account? <span onClick={() => setState("Login")} className="text-blue-600 underline cursor-pointer">Login here</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState("sign up")} className="text-blue-600 underline cursor-pointer">Click here</span></p>
        )}
      </div>
    </form>
  );
}

export default Login;
