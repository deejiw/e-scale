const { Schema, model } = require('mongoose')

const PayerSchema = new Schema({
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
})

// Define MongoDB collection name here
module.exports = Payer = model('payer', PayerSchema)
