import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: ""
  });

  const navigate = useNavigate();

  // Fetch items
  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add item
  const addItem = async (e) => {
    e.preventDefault();
    await API.post("/items", form);
    setForm({ itemName: "", description: "", type: "Lost", location: "" });
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // 🔥 Update item
  const updateItem = async (id) => {
    const newName = prompt("Enter new item name:");
    if (!newName) return;

    await API.put(`/items/${id}`, { itemName: newName });
    fetchItems();
  };

  // 🔍 Search items
  const searchItems = async () => {
    const res = await API.get(`/items/search?name=${search}`);
    setItems(res.data);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      <button className="btn btn-danger float-end" onClick={logout}>
        Logout
      </button>

      <h2 className="mb-4">Dashboard</h2>

      {/* 🔍 Search */}
      <input
        className="form-control mb-2"
        placeholder="Search items..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn btn-dark mb-4" onClick={searchItems}>
        Search
      </button>

      {/* Add Item */}
      <form onSubmit={addItem} className="card p-3 mb-4 shadow">
        <input
          className="form-control mb-2"
          placeholder="Item Name"
          value={form.itemName}
          onChange={(e) => setForm({ ...form, itemName: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="form-control mb-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>

        <button className="btn btn-primary">Add Item</button>
      </form>

      {/* Items List */}
      <div className="row">
        {items.length === 0 && <p>No items found</p>}

        {items.map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card shadow-lg border-0 rounded p-3 mb-3">

              <h5 className="fw-bold">{item.itemName}</h5>

              <p className="text-muted">{item.description}</p>

              <span
                className={`badge ${
                  item.type === "Lost" ? "bg-danger" : "bg-success"
                }`}
              >
                {item.type}
              </span>

              <p className="mt-2">📍 {item.location}</p>

              <div className="mt-2">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => updateItem(item._id)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;