import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchData = async () => {
    try {
      const ordersRes = await api.get("/orders");
      const customersRes = await api.get("/customers");
      const productsRes = await api.get("/products");

      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createOrder = async () => {

if (!customerId) {
  toast.error("Select a customer");
  return;
}

if (!productId) {
  toast.error("Select a product");
  return;
}

if (Number(quantity) <= 0) {
  toast.error("Quantity must be greater than 0");
  return;
}

    try {
      await api.post("/orders", {
        customer_id: Number(customerId),
        items: [
          {
            product_id: Number(productId),
            quantity: Number(quantity),
          },
        ],
      });

      setCustomerId("");
      setProductId("");
      setQuantity(1);

      fetchData();

      toast.success("Order created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Failed to create order"
      );
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Failed to delete order"
      );
    }
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
          Orders
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Create and manage customer orders.
        </p>

        {/* Create Order Card */}

        <div
          className="dashboard-card"
          style={{ marginBottom: "30px" }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Create Order
          </h2>

          <div
            className="form-grid-3"
          >
            <select
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.full_name}
                </option>
              ))}
            </select>

            <select
              value={productId}
              onChange={(e) =>
                setProductId(e.target.value)
              }
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />
          </div>

          <button
            onClick={createOrder}
            style={{
              marginTop: "20px",
            }}
          >
            Create Order
          </button>
        </div>

        {/* Orders Table */}

        <div className="dashboard-card">
          <h2 style={{ marginBottom: "20px" }}>
            Order History
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
                <th align="left">Order ID</th>
                <th align="left">Customer ID</th>
                <th align="left">Total Amount</th>
                <th align="left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      "1px solid #1e293b",
                    height: "60px",
                  }}
                >
                  <td>#{order.id}</td>

                  <td>{order.customer_id}</td>

                  <td>
                    ₹{order.total_amount}
                  </td>

                  <td>
                    <button
                      style={{
                        background: "#dc2626",
                      }}
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                color: "#94a3b8",
              }}
            >
              No orders found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}