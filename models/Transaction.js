const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Fill in BP name']
  },
  date: {
    type: Date,
    default: Date.now
  },
  records: [
    {
      weighIn: {
        type: Number,
        min: [0, 'Must be positive'],
        max: [99999, 'Must be less than 99999'],
        required: [true, 'Each sub-record must contain weigh in']
      },
      weighOut: {
        type: Number,
        min: [0, 'Must be positive'],
        max: [99999, 'Must be less than 99999'],
        required: false
      }
    }
  ]
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)
