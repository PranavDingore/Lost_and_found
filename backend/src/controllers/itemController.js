import Item from "../models/itemModel.js";


export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const updateItem = async (req, res) => {
  try {
    const { claimed, claimedBy } = req.body;

    // If claimed Yes but no name provided
    if (claimed === "Yes" && (!claimedBy || claimedBy.trim() === "")) {
      return res.status(400).json({
        message: "claimedBy is required when claimed is Yes"
      });
    }

    // If claimed Yes → set claimedBy, claimedDate and status Found
    if (claimed === "Yes") {
      req.body.claimedDate = new Date();
      req.body.status = "Found";   // ⭐ automatic change
    }

    // If claimed No → clear fields
    if (claimed === "No") {
      req.body.claimedBy = "";
      req.body.claimedDate = null;
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const searchItems = async (req, res) => {
  try {
    const { itemName, category, status, claimed } = req.query;

    let filter = {};

    if (itemName) {
      filter.itemName = { $regex: itemName, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (claimed) {
      filter.claimed = claimed;
    }

    const items = await Item.find(filter);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
