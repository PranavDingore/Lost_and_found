import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

function CreateItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    status: "Lost",
    contactName: "",
    contactNumber: "",
    remark: ""
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchItem = async () => {
        try {
          const res = await api.get(`/items/${id}`);
          setFormData(res.data);
        } catch (error) {
          toast.error("Failed to load item");
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await api.put(`/items/${id}`, formData);
        toast.success("Item updated successfully");
        navigate(`/items/${id}`);
      } else {
        await api.post("/items", formData);
        toast.success("Item created successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isEditMode ? "Edit Item" : "Add New Item"}
        </h2>

        <input
          className="input input-bordered w-full"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
        />

        <input
          className="input input-bordered w-full"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          className="input input-bordered w-full"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <select
          name="status"
          className="select select-bordered w-full"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input
          className="input input-bordered w-full"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Contact Name"
        />

        <input
          className="input input-bordered w-full"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />

        <input
          className="input input-bordered w-full"
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          placeholder="Remark"
        />

        <button className="btn btn-primary w-full">
          {isEditMode ? "Update Item" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreateItemPage;