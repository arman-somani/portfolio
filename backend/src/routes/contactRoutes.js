const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitContact, getContacts, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Strict rate limiting to prevent spam and bot abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 contact requests per `window`
  message: { message: 'Too many messages sent from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.route('/')
  .post(contactLimiter, submitContact)
  .get(protect, getContacts);

router.route('/:id')
  .delete(protect, deleteContact);

module.exports = router;
