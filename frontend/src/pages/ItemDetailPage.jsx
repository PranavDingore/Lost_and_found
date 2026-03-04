import { useEffect, useState } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";


function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();const goBack = () => {
  navigate(-1);
};
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showClaimInput, setShowClaimInput] = useState(false);
  const [claimedByName, setClaimedByName] = useState("");

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setItem(res.data);
    } catch (error) {
      toast.error("Failed to fetch item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/items/${id}`);
      toast.success("Item deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item");
    }
  };

const claimItem = async () => {
  if (!claimedByName) {
    toast.error("Please enter name");
    return;
  }

  try {
    await api.put(`/items/${id}`, {
      claimed: "Yes",
      claimedBy: claimedByName
    });

    toast.success("Item Claimed Successfully!");
    fetchItem();
    setShowClaimInput(false);
  } catch (error) {
    toast.error("Claim failed");
  }
};

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!item) {
    return <div className="text-center mt-20">Item not found</div>;
  }

  return (
    <div className="flex justify-center mt-10">
      <button
  onClick={goBack}
  className="btn btn-outline btn-sm mb-4"
>
  ← Back
</button>
      <div className="card bg-base-100 shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-3">
          {item.itemName}
        </h2>

        <p>{item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong>{" "}
        {new Date(item.date).toLocaleDateString()}
        </p>
        <p><strong>Status:</strong> {item.status}</p>
        <p><strong>Claimed:</strong> {item.claimed}</p>
        <p><strong>Contact Name:</strong> {item.contactName}</p>
        <p><strong>Contact Number:</strong> {item.contactNumber}</p>

       {item.claimed === "Yes" && (
  <>
    <p><strong>Claimed By:</strong> {item.claimedBy}</p>
    <p>
      <strong>Claimed Date:</strong>{" "}
      {new Date(item.claimedDate).toLocaleString()}
    </p>
  </>
)}
{item.claimed === "No" && (
  <div className="mt-4 space-y-2">

    {!showClaimInput ? (
      <button
        onClick={() => setShowClaimInput(true)}
        className="btn btn-success w-full"
      >
        Claim Item
      </button>
    ) : (
      <>
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full"
          value={claimedByName}
          onChange={(e) => setClaimedByName(e.target.value)}
        />

        <button
          onClick={claimItem}
          className="btn btn-primary w-full"
        >
          Confirm Claim
        </button>
        
      </>
    )}

  </div>
)}
        <Link
  to={`/edit/${item._id}`}
  className="btn btn-warning mt-4"
>
  Edit Item
</Link>
        <button
          onClick={handleDelete}
          className="btn btn-error mt-4"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemDetailPage;