const express = require('express')
const router = new express('Router')
const Task = require('../models/task.js')
const Review = require('../models/review.js')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

//GET /tasks?completed=false
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:
router.get('/reviews', auth, async (req,res)=>{
    const match = { 
    }
    const sort = {

    }
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
       await req.user.populate({
           path:'reviews',
           match,
           options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
           }
        }).execPopulate()
       res.send(req.user.reviews)
    } catch(e){
       res.status(500).send()
    }
  })
router.get('/reviews/:id', auth, async (req,res) =>{
    const _id = req.params.id
    try{
       const review = await Review.findOne({_id, owner: req.user._id})
      if(!review){
        return res.status(404).send()
    }
    res.send(review)
    } catch(e){
        res.status(500).send()
    }     
  
  })



router.patch(('/reviews/:id'), auth, async (req,res) =>{
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed', 'punctuality', 'performance', 'serviceDelivery']
  const isValidOperation = updates.every((update)=>{
    return allowedUpdates.includes(update)
})

if(!isValidOperation){
    return res.status(400).send({error: "Invalid Updates"})
}
try{
    const review = await Review.findById({_id: req.params.id, owner:req.user._id })
    if(!review){
        return res.status(404).send()
    }
    updates.forEach((update)=>{
        review[update] = req.body[update]
    })
    await review.save()
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
    res.send(review)
  
  } catch(e){
     res.status(400).send(e)
  }
  


})

router.delete(('/reviews/:id'), auth, async (req,res) =>{
try{
    const review = await Review.findOneAndDelete({_id:req.params.id , owner: req.user._id})
    if(!review){
        res.status(404).send("Review not Found")
    }
    res.status(200).send(review)
} catch(e){

    res.status(500).send("Review not Found")
}

})
router.post('/reviews', auth, async (req, res) =>{
    // const task = new Task(req.body)
    const review = new Review({
         ...req.body,
         owner: req.user._id

    })
    try{
        await review.save()
        res.status(201).send(review)
    } catch(e) {
        res.status(400).send(e)
    }
   })

router.post('/reviews/findreviewId', auth, async (req,res) =>{
    const description = req.body.description
    try{
       const review = await Review.findOne({description, owner: req.user._id})
      if(!review){
        return res.status(404).send("Review Not Found")
    }
    res.send(review._id)
    } catch(e){
        res.status(500).send()
    }     
  
})

module.exports = router