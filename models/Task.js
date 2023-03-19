const mongoose = require('mongoose');

const TaskScheme = new mongoose.Schema({
  name:{
    type: String,
    required: [true,'must provide name'],
    trim: true,
    maxlength:[20,'name cant be more then 20 characters']
  },
  completed: { 
    type: Boolean,
  }
})
module.exports = mongoose.model('Task', TaskScheme);