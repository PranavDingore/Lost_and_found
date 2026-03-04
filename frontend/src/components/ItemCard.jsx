import { Link } from "react-router-dom";
import { MapPin, Tag } from "lucide-react";

function ItemCard({ item }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200">
      <div className="card-body">

        <h2 className="card-title text-lg font-semibold">
          {item.itemName}
        </h2>


        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>


        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            {item.location}
          </div>

          <div className="flex items-center gap-1">
            <Tag size={16} />
            {item.category}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span
            className={`badge ${
              item.status === "Lost"
                ? "badge-error"
                : "badge-info"
            }`}
          >
            {item.status}
          </span>

          <span
            className={`badge ${
              item.claimed === "Yes"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {item.claimed === "Yes"
              ? "Claimed"
              : "Not Claimed"}
          </span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/items/${item._id}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;