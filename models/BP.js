const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BP_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = BP = mongoose.model('bp_master', BP_Schema)
