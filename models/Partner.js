const { Schema, model } = require('mongoose')

const PartnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  taxId: {
    type: Number,
    required: false
  },
  tel1: {
    type: Number,
    required: false
  },
  tel2: {
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
        type: String,
        required: [true, 'Account number is required']
      },
      accountName: {
        type: String,
        required: [true, 'Account name is required']
      }
    }
  ]
})

// Define MongoDB collection name here
module.exports = Partner = model('partner', PartnerSchema)
