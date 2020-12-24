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
      material: {
        type: String,
        required: [true, 'Please enter the material']
      },
      weighIn: {
        type: Number,
        min: [0, 'Must be positive'],
        max: [99999, 'Must be less than 99999'],
        required: [true, 'Please enter weigh in']
      },
      weighOut: {
        type: Number,
        min: [0, 'Must be positive'],
        max: [99999, 'Must be less than 99999'],
        required: [true, 'Please enter weigh out']
      },
      remarks: {
        type: String,
        required: false
      }
    }
  ]
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)
