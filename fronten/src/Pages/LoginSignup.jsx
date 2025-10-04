import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = state === "Sign Up"
    ? "http://localhost:5000/api/auth/register"
    : "http://localhost:5000/api/auth/login";

  const payload = state === "Sign Up"
    ? { username: name, email, password } // ✅ must be `username`
    : { email, password };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert(`${state} successful!`);

      if (state === "Login") {
        localStorage.setItem("token", data.token);

        // ✅ ✅ ✅ Add this line:
        localStorage.setItem("username", data.username); 
      }

      // Optionally: window.location.href = "/" to redirect to home
    } else {
      alert(data.message || `${state} failed!`);
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Continue</button>

        {state === "Sign Up" ? (
          <p className='loginsignup-login'>
            Already have an account? <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account? <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" required />
          <p>By continuing, you agree to our terms.</p>
        </div>
      </form>
    </div>
  );
};
