const Broker = require("../models/Broker");

const createBroker = async (req, res) => {
  try {
    const broker = await Broker.create(req.body);
    res.status(201).json({ message: "Broker created successfully", broker });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBrokers = async (req, res) => {
  try {
    const brokers = await Broker.find();
    res.status(200).json(brokers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBroker = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Broker ID is required" });
    }
    const broker = await Broker.findById(id);
    if (!broker) return res.status(404).json({ message: "Broker not found" });

    res.status(200).json(broker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBroker = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Broker ID is required" });
    }
    const broker = await Broker.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!broker) return res.status(404).json({ message: "Broker not found" });

    res.status(200).json({ message: "Updated", broker });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteBroker = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Broker ID is required" });
    }
    const broker = await Broker.findByIdAndDelete(id);
    if (!broker) return res.status(404).json({ message: "Broker not found" });

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createBroker,
  getAllBrokers,
  getBroker,
  updateBroker,
  deleteBroker,
};
