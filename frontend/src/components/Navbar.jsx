import { Link } from "react-router-dom";
import { Package } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content px-6 shadow-md">
      <div className="flex-1 flex items-center gap-2">
        <Package size={22} />
        <Link to="/" className="text-xl font-bold">
          Lost & Found Portal
        </Link>
      </div>

      <div>
        <Link to="/create" className="btn btn-sm btn-secondary">
          + Add Item
        </Link>
      </div>
    </div>
  );
}

export default Navbar;