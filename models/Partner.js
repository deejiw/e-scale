const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
  ]
})

module.exports = Partner = mongoose.model('bp_master', PartnerSchema)
