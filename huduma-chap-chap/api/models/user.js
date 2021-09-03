const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task.js')
const Review = require('./review.js')
const userSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true,
       trim: true,
       minlength: 3
  
    },
    age:{
       type: Number,
       validate(value) {
        if(value <0){
            throw new Error('Age must be a positive number')
        }
       },
       required:false,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        },
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        minlength:7,
        validate(value) {
         if(value.toLowerCase().includes('password')){
             throw new Error("Password cannot contain 'password'")
         }
        },
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    },
    userType:{
        type: String,
        required: true,
        trim: true,
    },
    occupation:{
        type: String,
        required: true,
        trim: true,
    },
    portfolio: [{
        project:{
            type: Buffer,
        },
    }],
    birthDate: {
        type:Date,
        trim: true
    },
    education:[{
        bachelors:{
            type:String,
            trim: true
        },
        certificate:{
            type: String,
            trim: true
        },
        diploma:{
            type:String,
            trim: true
        },
        associate:{
            type:String,
            trim: true
        }
    }],
    experience:[{
        job:[{
            description:{
                type: String,
                trim:true
            },
            position:{
                type:String,
                trim:true
            },
            dateEntered:{
                type:Date,
                trim:true
            },
            dateLeft:{
                type:Date,
                trim:true
            }
        }]
    }],
    qualifications:{
        type: String, 
        trim: true
    },
    description:{
        type: String,
        trim: true
    }
    
  }, {
      timestamps:true
  })

userSchema.virtual('tasks', {
    ref:'Tasks',
    localField: '_id',
    foreignField:'owner'
})
userSchema.virtual('myTasks', {
    ref:'Tasks',
    localField: '_id',
    foreignField:'sender'
})
userSchema.virtual('reviews', {
    ref:'Reviews',
    localField: '_id',
    foreignField:'owner'
})
userSchema.methods.toJSON =  function(){
    const user = this
    userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'thisismynewrestapp')
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}


userSchema.statics.findByCredentials = async (email, password) =>{
const user = await User.findOne({email})
if(!user){
    throw new Error({error: "Unable to Log In"})
}
const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch){
    throw new Error({error: "Unable to Log In"})
}
return user
}
//Hash the plaintext password before saving
userSchema.pre('save', async function (next){
  const user = this
  console.log('just before saving')
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
//Delete User Tasks who has deleted themselves 
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
    await Review.deleteMany({owner: user._id})
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User