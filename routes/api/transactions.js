const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Transaction = require('../../models/Transaction')

// @route   POST api/transactions
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Transaction({
    name: req.body.name
  })
  newItem.save().then(item => res.json(item))
})

// @route   GET api/transactions
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  Transaction.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route   PATCH api/transactions
// @desc    Update a post
// @access  Private
router.patch('/:id', auth, (req, res) => {
  Transaction.findById(req.params.id)
    .then(item => {
      item
        .updateOne({ $set: { date: Date.now } })
        .then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

// @route   DELETE api/transactions
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Transaction.findById(req.params.id)
    .then(item => {
      item.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router
