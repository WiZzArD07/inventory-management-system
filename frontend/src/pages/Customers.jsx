import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {

if (!fullName.trim()) {
  toast.error("Full name is required");
  return;
}

if (!email.trim()) {
  toast.error("Email is required");
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  toast.error("Invalid email format");
  return;
}

if (!phone.trim()) {
  toast.error("Phone number is required");
  return;
}

if (!/^\d{10}$/.test(phone)) {
  toast.error("Phone number must be exactly 10 digits");
  return;
}

    try {
      await api.post("/customers", {
        full_name: fullName,
        email,
        phone,
      });

      setFullName("");
      setEmail("");
      setPhone("");

      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to create customer");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Delete failed");
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
          Customers
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Manage customer records and contact information.
        </p>

        {/* Create Customer */}

        <div
          className="dashboard-card"
          style={{ marginBottom: "30px" }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Create Customer
          </h2>

          <div
            className="form-grid-3"
          >
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                    setPhone(value);
                }
               }}
            />
          </div>

          <button
            onClick={addCustomer}
            style={{
              marginTop: "20px",
            }}
          >
            Add Customer
          </button>
        </div>

        {/* Customer Table */}

        <div className="dashboard-card">
          <h2 style={{ marginBottom: "20px" }}>
            Customer Directory
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
                <th align="left">Full Name</th>
                <th align="left">Email</th>
                <th align="left">Phone</th>
                <th align="left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  style={{
                    borderBottom:
                      "1px solid #1e293b",
                    height: "60px",
                  }}
                >
                  <td>{customer.id}</td>

                  <td>{customer.full_name}</td>

                  <td>{customer.email}</td>

                  <td>{customer.phone}</td>

                  <td>
                    <button
                      style={{
                        background: "#dc2626",
                      }}
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                color: "#94a3b8",
              }}
            >
              No customers found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}