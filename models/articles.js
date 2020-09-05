const mongoose = require("mongoose")

const schema = mongoose.Schema({
  title: {
    type: String
   
  },
  Author: {
    type: String
   
  },
  date: {
    type: Date,
   
    default: Date.now
  },
  content: {
    type: String
   
    
  }
});






module.exports = mongoose.model("articles", schema);