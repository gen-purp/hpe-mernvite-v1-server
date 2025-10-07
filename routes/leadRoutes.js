const express = require('express');
const Lead = require('../models/Lead');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

// PUBLIC: POST /api/leads  (from website contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || (!email && !phone)) {
      return res.status(400).json({ message: 'Name and at least one of email/phone are required' });
    }
    const lead = await Lead.create({ name, email, phone, message, source: 'website' });
    res.status(201).json({ id: lead._id });
  } catch (err) {
    console.error('Create lead error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PROTECTED: GET /api/leads (list)
router.get('/', authRequired, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error('List leads error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PROTECTED: PATCH /api/leads/:id (update status/notes)
router.patch('/:id', authRequired, async (req, res) => {
  try {
    const { status, notes } = req.body || {};
    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error('Update lead error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
