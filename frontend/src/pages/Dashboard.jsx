import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const response = await api.get("/dashboard");
    setData(response.data);
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1>Dashboard</h1>

      <h3>Total Products: {data.total_products}</h3>

      <h3>Total Customers: {data.total_customers}</h3>

      <h3>Total Orders: {data.total_orders}</h3>

      <h3>Low Stock Products</h3>

      <ul>
        {data.low_stock_products.map(product => (
          <li key={product.id}>
            {product.name} - {product.stock_quantity}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Dashboard;