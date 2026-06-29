import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleRegister = (e) => {
  e.preventDefault();

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const user = {
    fullName,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration Successful");
};

  return (
    <div className="login-container">
      <h1 className="logo">Help Desk</h1>

      <div className="login-card">
        <div className="card-header">
          <h2>Create Account</h2>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

       <p className="signup-text">
  Already have an account?{" "}
  <Link to="/">Login</Link>
</p>
      </div>
    </div>
  );
}

export default Register;