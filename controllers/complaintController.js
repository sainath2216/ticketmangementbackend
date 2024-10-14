// backend/controllers/complaintController.js
const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.raiseComplaint = async (req, res) => {
  const { title, description } = req.body;

  // Create a new complaint
  const newComplaint = new Complaint({
    title,
    description,
    user: req.user._id
  });

  try {
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint raised successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to raise complaint' });
  }
};

exports.getUserComplaints = async (req, res) => {
  const complaints = await Complaint.find({ user: req.user._id });
  res.status(200).json(complaints);
};

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find();
  res.status(200).json(complaints);
};

exports.assignComplaint = async (req, res) => {
  const { complaintId, adminId } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    complaint.assignedTo = adminId;
    complaint.status = 'in-progress';
    await complaint.save();
    res.status(200).json({ message: 'Complaint assigned' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to assign complaint' });
  }
};
