const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const BP = require('../../models/BP')

// @route   POST api/bps
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new BP({
    name: req.body.name
  })
  newItem.save().then(item => res.json(item))
})

// @route   GET api/bps
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  BP.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route   PATCH api/bps
// @desc    Update a post
// @access  Private
router.patch('/:id', auth, (req, res) => {
  BP.findById(req.params.id)
    .then(item => {
      item
        .updateOne({ $set: { date: Date.now } })
        .then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

// @route   DELETE api/bps
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  BP.findById(req.params.id)
    .then(item => {
      item.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router