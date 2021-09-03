const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
   description:{
      type: String,
      required: true,
      trim: true
   },
   performance:{
      type: Number,
      default: false, 
      required: true
   },
   punctuality:{
         type: Number, 
         trim: true
         
   },
   serviceDelivery:{
         type: Number,
         trim: true
   },
   //To be able to set an expiry date
   tokens:[{
      token:{
          type:String,
          required: true
      }
  }],
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      ref: 'User'
      
   }
 }, {
    timestamps:true
 })
const Review = mongoose.model('Reviews',reviewSchema)
module.exports = Review