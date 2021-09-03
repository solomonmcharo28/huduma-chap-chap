const mongoose = require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/huduma-chap-api", {
useNewUrlParser: true,
useCreateIndex: true

})




// const me = new User({
//     name: "   Paul   ",
//     email: "pogba@email.com",
//     password: "mypass123"
// })

// me.save().then(() => {
// console.log(me)
// }).catch((error) =>{
//    console.log('Error!', error)
// })


// const jobApp = new Task({
//     description:" Apply to Jobs",
//     completed: false
// })

// jobApp.save().then(() => {
//     console.log(jobApp)
//     }).catch((error) =>{
//        console.log('Error!', error)
//     })