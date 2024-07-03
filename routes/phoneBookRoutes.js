// backend/routes/phoneBookRoutes.js

const express = require('express');
const PhoneBook = require('../model/PhoneBook'); // Correct relative path
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

module.exports = router;
