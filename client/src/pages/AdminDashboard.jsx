import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  stock: "",
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // =========================================
  // AUTH CONFIG
  // =========================================

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================

  const fetchData = async () => {
    try {
      const config = getAuthConfig();

      const [statsResponse, productsResponse] =
        await Promise.all([
          axios.get(
            `${API_URL}/dashboard/stats`,
            config
          ),

          axios.get(
            `${API_URL}/products`,
            config
          ),
        ]);

      setStats(statsResponse.data);
      setProducts(productsResponse.data);

    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );

      // If token is invalid/expired
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // =========================================
  // ADD PRODUCT
  // =========================================

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  // =========================================
  // EDIT PRODUCT
  // =========================================

  const openEditModal = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock ?? "",
    });

    setShowModal(true);
  };

  // =========================================
  // CLOSE MODAL
  // =========================================

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // =========================================
  // FORM CHANGE
  // =========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // ADD / UPDATE PRODUCT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.image ||
      form.stock === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const config = getAuthConfig();

      if (editingId) {
        // UPDATE PRODUCT

        await axios.put(
          `${API_URL}/products/${editingId}`,
          productData,
          config
        );
      } else {
        // ADD PRODUCT

        await axios.post(
          `${API_URL}/products`,
          productData,
          config
        );
      }

      closeModal();

      await fetchData();

    } catch (error) {
      console.error(
        "Failed to save product:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE PRODUCT
  // =========================================

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const config = getAuthConfig();

      await axios.delete(
        `${API_URL}/products/${id}`,
        config
      );

      await fetchData();

    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }

  // =========================================
  // CHART DATA
  // =========================================

  const chartData = Object.entries(
    stats?.categories || {}
  ).map(([name, value]) => ({
    name,
    products: value,
  }));

  // =========================================
  // DASHBOARD UI
  // =========================================

  return (
    <div className="admin-page">

      {/* ================================
          HEADER
      ================================= */}

      <div className="admin-header">

        <div>
          <span className="admin-label">
            LUXECART ADMIN
          </span>

          <h1>Dashboard</h1>

          <p>
            Manage your store and monitor inventory.
          </p>
        </div>

        <div className="admin-header-actions">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            className="admin-add-btn"
            onClick={openAddModal}
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* ================================
          STATS
      ================================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Products</span>

          <strong>
            {stats?.totalProducts || 0}
          </strong>

          <small>
            Products in catalog
          </small>
        </div>

        <div className="stat-card">
          <span>Total Stock</span>

          <strong>
            {stats?.totalStock || 0}
          </strong>

          <small>
            Units available
          </small>
        </div>

        <div className="stat-card">
          <span>Inventory Value</span>

          <strong>
            ₹{(stats?.totalValue || 0).toLocaleString()}
          </strong>

          <small>
            Current inventory
          </small>
        </div>

      </div>

      {/* ================================
          CHART
      ================================= */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>
            Products by Category
          </h2>

          <p>
            Current product distribution
          </p>

        </div>

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="products"
                fill="#171717"
                radius={[4, 4, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================================
          PRODUCT MANAGEMENT
      ================================= */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>
            Product Management
          </h2>

          <p>
            Manage your store products
          </p>

        </div>

        <div className="table-wrapper">

          <table className="product-table">

            <thead>

              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product._id}>

                  <td>

                    <div className="admin-product">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <span>
                        {product.name}
                      </span>

                    </div>

                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ₹{product.price.toLocaleString()}
                  </td>

                  <td>

                    <span
                      className={
                        product.stock < 10
                          ? "stock-low"
                          : "stock-ok"
                      }
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditModal(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================
          ADD / EDIT MODAL
      ================================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>

                <span className="admin-label">
                  PRODUCT
                </span>

                <h2>
                  {editingId
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="product-form"
              onSubmit={handleSubmit}
            >

              {/* PRODUCT NAME */}

              <div className="form-group">

                <label>
                  Product Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Hoodie"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  rows="3"
                  required
                />

              </div>

              {/* PRICE + STOCK */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="2499"
                    min="0"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="25"
                    min="0"
                    required
                  />

                </div>

              </div>

              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Jackets">
                    Jackets
                  </option>

                  <option value="Footwear">
                    Footwear
                  </option>

                  <option value="T-Shirts">
                    T-Shirts
                  </option>

                  <option value="Bags">
                    Bags
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

              </div>

              {/* IMAGE */}

              <div className="form-group">

                <label>
                  Image URL
                </label>

                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />

              </div>

              {/* MODAL ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;