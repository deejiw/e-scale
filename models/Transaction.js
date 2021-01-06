const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Fill in name']
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: false
  },
  payment: [
    {
      type: {
        type: String,
        required: [true, 'Type is required']
      },
      bank: {
        type: String,
        required: [true, 'Bank is required']
      },
      accountNumber: {
        type: Number,
        required: [true, 'Account number is required']
      },
      accountName: {
        type: String,
        required: [true, 'Account name is required']
      }
    }
  ],
  records: [
    {
      plate: {
        type: String,
        required: [true, 'Please enter plate number']
      },
      record: [
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
          deduction: {
            type: Number,
            required: false,
            default: 0
          },
          remarks: {
            type: String,
            required: false
          },
          price: {
            type: Number,
            min: [0, 'Must be positive'],
            max: [1000, 'Must be less than 1000'],
            required: [true, 'Please enter price']
          },
          amount: {
            type: Number,
            min: [0, 'Must be positive'],
            required: [true, 'Please enter price']
          }
        }
      ]
    }
  ]
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)
