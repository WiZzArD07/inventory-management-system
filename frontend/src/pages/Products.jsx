import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async () => {

    if (!name.trim()) {
    toast.error("Product name is required");
    return;
  }

  if (!sku.trim()) {
    toast.error("SKU is required");
    return;
  }

  if (Number(price) <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  if (Number(stock) < 0) {
    toast.error("Stock cannot be negative");
    return;
  }
  
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, {
          name,
          sku,
          price: Number(price),
          stock_quantity: Number(stock),
        });

        toast.success("Product Updated Successfully");
      } else {
        await api.post("/products", {
          name,
          sku,
          price: Number(price),
          stock_quantity: Number(stock),
        });

        toast.success("Product Added Successfully");
      }

      setEditingId(null);
      setName("");
      setSku("");
      setPrice("");
      setStock("");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Operation Failed"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      toast.success("Product Deleted");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Delete Failed"
      );
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setName(product.name);
    setSku(product.sku);
    setPrice(product.price);
    setStock(product.stock_quantity);
  };

  const cancelEdit = () => {
    setEditingId(null);

    setName("");
    setSku("");
    setPrice("");
    setStock("");
  };

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          Products
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Manage your inventory products.
        </p>

        {/* Create / Edit Product */}

        <div
          className="dashboard-card"
          style={{ marginBottom: "30px" }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            {editingId
              ? "Edit Product"
              : "Create Product"}
          </h2>

          <div
            className="form-grid"
          >
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              placeholder="SKU"
              value={sku}
              onChange={(e) =>
                setSku(e.target.value)
              }
            />

            <input
              type="number"
              min="1"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
            />
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button onClick={saveProduct}>
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingId && (
              <button
                style={{
                  background: "#64748b",
                }}
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Products Table */}

        <div className="dashboard-card">
          <h2 style={{ marginBottom: "20px" }}>
            Product Inventory
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom:
                    "1px solid #334155",
                }}
              >
                <th align="left">ID</th>
                <th align="left">Name</th>
                <th align="left">SKU</th>
                <th align="left">Price</th>
                <th align="left">Stock</th>
                <th align="left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom:
                      "1px solid #1e293b",
                    height: "60px",
                  }}
                >
                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.sku}</td>

                  <td>
                    ₹{product.price}
                  </td>

                  <td>
                    {product.stock_quantity}
                  </td>

                  <td>
                    <button
                      style={{
                        background: "#2563eb",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        editProduct(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={{
                        background: "#dc2626",
                      }}
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                color: "#94a3b8",
              }}
            >
              No products found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}