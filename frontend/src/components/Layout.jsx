import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}