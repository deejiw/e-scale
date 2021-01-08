const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Partner = require('../../models/Partner')

// @route   POST api/partners
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Partner({
    name: req.body.name,
    taxId: req.body.taxId,
    tel1: req.body.tel1,
    tel2: req.body.tel2,
    payment: []
  })
  newItem.save().then(item => res.json(item))
})

// @route   GET api/partners
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  Partner.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route   PATCH api/partners
// @desc    Update a post
// @access  Private
router.patch('/:id', auth, (req, res) => {
  Partner.findById(req.params.id)
    .then(item => {
      item
        .updateOne({ $set: { date: Date.now } })
        .then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

// @route   DELETE api/partners
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
