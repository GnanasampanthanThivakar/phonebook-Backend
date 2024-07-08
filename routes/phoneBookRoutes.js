const express = require('express');
const PhoneBook = require('../model/PhoneBook'); // Adjust relative path as per your project structure
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
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// GET route to fetch a single phone book entry by ID
router.get('/get-phone/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const phoneBookEntry = await PhoneBook.findById(id);
    if (!phoneBookEntry) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Phone book entry not found'
      });
    }
    res.status(200).json({
      status: 'Success',
      data: {
        phoneBookEntry
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// PUT route to update a phone book entry by ID
router.put('/update-phone/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  try {
    const updatedPhoneBookEntry = await PhoneBook.findByIdAndUpdate(id, { name, phone }, { new: true });
    if (!updatedPhoneBookEntry) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Phone book entry not found'
      });
    }
    res.status(200).json({
      status: 'Success',
      data: {
        phoneBookEntry: updatedPhoneBookEntry
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// DELETE route to delete a phone book entry by ID
router.delete('/delete-phone/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPhoneBookEntry = await PhoneBook.findByIdAndDelete(id);
    if (!deletedPhoneBookEntry) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Phone book entry not found'
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Phone book entry deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

module.exports = router;
