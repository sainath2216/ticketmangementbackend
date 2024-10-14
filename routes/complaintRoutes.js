// backend/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const verifyToken = require('../middlewares/verifyToken');

// Raise a complaint
router.post('/raise', verifyToken, complaintController.raiseComplaint);

// Get all complaints (admin)
router.get('/all', verifyToken, complaintController.getAllComplaints);

// Get user-specific complaints
router.get('/user', verifyToken, complaintController.getUserComplaints);

// Assign a complaint to admin
router.put('/assign', verifyToken, complaintController.assignComplaint);

module.exports = router;
