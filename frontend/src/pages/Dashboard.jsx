import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaExclamationTriangle
} from "react-icons/fa";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <Layout>
        <h2>Loading Dashboard...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px"
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px"
          }}
        >
          Monitor inventory, customers and orders.
        </p>

        {/* Stats Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          <div className="stat-card">
            <div>
              <p>Total Products</p>
              <h2>{dashboard.total_products}</h2>
            </div>

            <FaBox size={30} color="#3b82f6" />
          </div>

          <div className="stat-card">
            <div>
              <p>Total Customers</p>
              <h2>{dashboard.total_customers}</h2>
            </div>

            <FaUsers size={30} color="#10b981" />
          </div>

          <div className="stat-card">
            <div>
              <p>Total Orders</p>
              <h2>{dashboard.total_orders}</h2>
            </div>

            <FaShoppingCart size={30} color="#f59e0b" />
          </div>

          <div className="stat-card">
            <div>
              <p>Low Stock</p>
              <h2>
                {dashboard.low_stock_products.length}
              </h2>
            </div>

            <FaExclamationTriangle
              size={30}
              color="#ef4444"
            />
          </div>

        </div>

        {/* Bottom Grid */}

        <div
          className="dashboard-bottom"
        >

          {/* Low Stock Products */}

          <div className="dashboard-card">

            <h2>Low Stock Products (Under 5)</h2>

            {dashboard.low_stock_products.length === 0 ? (
              <p>No low stock products.</p>
            ) : (
              dashboard.low_stock_products.map(product => (
                <div
                  key={product.id}
                  style={{
                    padding: "15px",
                    marginTop: "10px",
                    background: "#111827",
                    borderRadius: "10px"
                  }}
                >
                  <strong>{product.name}</strong>

                  <p>
                    Stock Remaining:
                    {" "}
                    {product.stock_quantity}
                  </p>
                </div>
              ))
            )}

          </div>

          {/* Activity */}

          <div className="dashboard-card">

            <h2>Recent Activity</h2>

            <div className="activity-card">
              Product inventory monitored
            </div>

            <div className="activity-card">
              Customer records active
            </div>

            <div className="activity-card">
              Orders being tracked
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}