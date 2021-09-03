const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
   description:{
      type: String,
      required: true,
      trim: true
   },
   name:{
      type: String,
      required: true,
      trim: true
   },
   email:{
      type: String,
      required: true,
      trim: true
   },
   completed:{
      type: Boolean,
      default: false, 
      required: true
   },
   billingMethod:{
         type: String, 
         trim: true
         
   },
   hours:{
         type: Number,
         trim: true
   },
   dueDate:{
         type:Date,
         trim:true
   },
   totalPayment:{
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
      
   },
   sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   message: {
      type: String,
      trim: true
   },
   accepted: {
      type: Boolean,
      trim: true
   },
   paymentMethod:{
      type: String,
      trim: true
   },
   editOwner:{
      type: Boolean,
      trim: true
   }
 }, {
    timestamps:true
 })
const Task = mongoose.model('Tasks',taskSchema)
module.exports = Task