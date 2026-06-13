import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <Link to="/">Dashboard</Link>

      {" | "}

      <Link to="/products">Products</Link>

      {" | "}

      <Link to="/customers">Customers</Link>

      {" | "}

      <Link to="/orders">Orders</Link>

    </nav>
  );
}

export default Navbar;