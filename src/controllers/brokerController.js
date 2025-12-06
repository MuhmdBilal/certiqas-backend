const Broker = require("../models/Broker");

const createBroker = async (req, res) => {
  try {
    const { brokerName, brokerEmail, contactNo } = req.body;
    const userId = req.user.id || req.user.userId;
    const userRole = req.user.role;

    const existingBroker = await Broker.findOne({ brokerEmail });
    if (existingBroker) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const brokerData = { brokerName, brokerEmail, contactNo };
    if (userRole === "Developer") {
      brokerData.developerId = userId;
    }

    const broker = await Broker.create(brokerData);
    res.status(201).json({ message: "Broker created successfully", broker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBrokers = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const userRole = req.user.role;

    const query = userRole === "Developer" ? { developerId: userId } : {};

    const brokers = await Broker.find(query);
    res.status(200).json(brokers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user.userId;
    const userRole = req.user.role;

    const broker = await Broker.findById(id);
    if (!broker) return res.status(404).json({ message: "Broker not found" });

    if (userRole === "Developer" && broker.developerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(broker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user.userId;
    const userRole = req.user.role;

    const broker = await Broker.findById(id);
    if (!broker) return res.status(404).json({ message: "Broker not found" });

    if (userRole === "Developer" && broker.developerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const updatedBroker = await Broker.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Updated", broker: updatedBroker });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user.userId;
    const userRole = req.user.role;

    const broker = await Broker.findById(id);
    if (!broker) return res.status(404).json({ message: "Broker not found" });

    if (userRole === "Developer" && broker.developerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Broker.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
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
