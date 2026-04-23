const Item = require("../models/Item");

// Add Item
exports.addItem = async (req, res) => {
  const item = new Item({ ...req.body, user: req.user });
  await item.save();
  res.json(item);
};

// Get All
exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// Get by ID
exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

// Update
exports.updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(403).json({ msg: "Unauthorized" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete
exports.deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(403).json({ msg: "Unauthorized" });

  await item.deleteOne();
  res.json({ msg: "Deleted" });
};

// Search
exports.searchItems = async (req, res) => {
  const name = req.query.name;
  const items = await Item.find({ itemName: { $regex: name, $options: "i" } });
  res.json(items);
};