const mongoose = require('mongoose');

const OpenMatSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Must be at least 2 characters'],
    minlength: 2
  },
  date: {
    type: Date,
    required: [true, "Date must not be empty"]
    // minlength: [2, 'Must be at least 2 characters']
  },
  time: {
    type: String,
    required: [ true, 'Time must not be empty']
    // minlength: [2, 
  },
  address: {
    type: String,
    required: [true, 'Must be at least 10 characters'],
    minlength: 10
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
},
{
    timestamps: true
},
);

module.exports = mongoose.model('OpenMat', OpenMatSchema);

