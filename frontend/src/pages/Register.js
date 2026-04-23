import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input className="form-control mb-2" placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />
        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;