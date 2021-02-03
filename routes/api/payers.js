const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Payer = require('../../models/Payer')

// @route   GET api/partners
// @desc    Get all items
// @access  Public
router.get('/:name', (req, res) => {
  if (req.params.name !== '') {
    Partner.find({ name: req.params.name }).then(partner => res.json(partner))
  } else {
    Partner.find()
      .sort({ date: -1 })
      .then(partners => res.json(partners))
  }
})

// @route   POST api/partners
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Partner({
    name: req.body.header.name,
    taxId: req.body.header.taxId,
    tel1: req.body.header.tel1,
    tel2: req.body.header.tel2,
    payment: req.body.payment
  })
  newItem.save().then(item => res.json(item))
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
