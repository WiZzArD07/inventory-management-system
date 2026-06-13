import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaUsers,
  FaShoppingCart
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />
    },
    {
      name: "Products",
      path: "/products",
      icon: <FaBox />
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />
    }
  ];

  return (
    <div className="sidebar">

      <div className="logo">
        InventoryX
      </div>

      {menu.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={
            location.pathname === item.path
              ? "menu active"
              : "menu"
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}

    </div>
  );
}