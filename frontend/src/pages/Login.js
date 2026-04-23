import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // 🔐 Save token
      localStorage.setItem("token", res.data.token);

      // 🔁 Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid login");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="btn btn-success">Login</button>

        {/* 🔥 REGISTER LINK (IMPORTANT) */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

      </form>
    </div>
  );
}

export default Login;