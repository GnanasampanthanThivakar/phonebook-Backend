const express = require('express');
const PhoneBook = require('../models/PhoneBook'); // Ensure the correct relative path
const router = express.Router();

// POST route to add a new phone book entry
router.post('/add-phone', async (req, res) => {
  const { name, phone } = req.body;

  try {
    const newPhoneBookEntry = new PhoneBook({ name, phone });
    await newPhoneBookEntry.save();

    res.status(201).json({
      status: 'Success',
      data: {
        phoneBookEntry: newPhoneBookEntry
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// GET route to fetch all phone numbers
router.get('/get-phone', async (req, res) => {
  try {
    const phoneNumbers = await PhoneBook.find({});
    res.status(200).json({
      status: 'Success',
      data: {
        phoneNumbers
      }
    });
  } catch (err) {
    res.status  (500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// POST route to sync phone book entries
router.post('/sync', async (req, res) => {
  const phoneBookEntries = req.body;

  try {
    for (const entry of phoneBookEntries) {
      // Check for existing entry
      const existingEntry = await PhoneBook.findOne({ name: entry.name, phone: entry.phone });

      if (!existingEntry) {
        const newEntry = new PhoneBook(entry);
        await newEntry.save();
      }
    }

    res.status(200).json({
      status: 'Success',
      message: 'Data synced successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

module.exports = router;
