import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

function HomePage() {
  const [items, setItems] = useState([]);
  const totalItems = items.length;
const lostItems = items.filter(item => item.status === "Lost").length;
const foundItems = items.filter(item => item.status === "Found").length;
const claimedItems = items.filter(item => item.claimed === "Yes").length;
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [claimed, setClaimed] = useState("");

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (search) query.append("itemName", search);
      if (status) query.append("status", status);
      if (claimed) query.append("claimed", claimed);

      const res = await api.get(`/items/search?${query.toString()}`);
      setItems(res.data);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setClaimed("");
    fetchItems();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/items/${id}`);
      toast.success("Item deleted");
      fetchItems();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6">


<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="card bg-base-100 shadow-md">
    <div className="card-body text-center">
      <h2 className="text-sm opacity-60">Total Items</h2>
      <p className="text-2xl font-bold">{totalItems}</p>
    </div>
  </div>

  <div className="card bg-base-100 shadow-md border-l-4 border-red-500">
    <div className="card-body text-center">
      <h2 className="text-sm opacity-60">Lost</h2>
      <p className="text-2xl font-bold text-red-500">{lostItems}</p>
    </div>
  </div>

  <div className="card bg-base-100 shadow-md border-l-4 border-blue-500">
    <div className="card-body text-center">
      <h2 className="text-sm opacity-60">Found</h2>
      <p className="text-2xl font-bold text-blue-500">{foundItems}</p>
    </div>
  </div>

  <div className="card bg-base-100 shadow-md border-l-4 border-green-500">
    <div className="card-body text-center">
      <h2 className="text-sm opacity-60">Claimed</h2>
      <p className="text-2xl font-bold text-green-500">{claimedItems}</p>
    </div>
  </div>

</div>


      <div className="card bg-base-100 shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search by item name"
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={claimed}
            onChange={(e) => setClaimed(e.target.value)}
          >
            <option value="">All Claimed</option>
            <option value="Yes">Claimed</option>
            <option value="No">Not Claimed</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="btn btn-primary flex-1"
            >
              Search
            </button>

            <button
              onClick={resetFilters}
              className="btn btn-outline flex-1"
            >
              Reset
            </button>
          </div>

        </div>
      </div>


      {loading ? (
        <div className="flex justify-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">

            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Claimed</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item._id}>

                  <td className="font-medium">
                    {item.itemName}
                  </td>

                  <td>{item.category}</td>

                  <td>{item.location}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "Lost"
                          ? "badge-error"
                          : "badge-info"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.claimed === "Yes"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.claimed}
                    </span>
                  </td>

                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="flex gap-2">
                    <Link
                      to={`/items/${item._id}`}
                      className="btn btn-xs btn-primary"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit/${item._id}`}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default HomePage;