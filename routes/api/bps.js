const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const BP = require('../../models/BP')

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  BP.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route   POST api/items
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new BP({
    name: req.body.bp_name
  })
  newItem.save().then(item => res.json(item))
})

// @route   DELETE api/items
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
