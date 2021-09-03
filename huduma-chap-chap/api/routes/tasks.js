const express = require('express')
const router = new express('Router')
const Task = require('../models/task.js')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

//GET /tasks?completed=false
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:
router.get('/tasks', auth, async (req,res)=>{
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
           path:'tasks',
           match,
           options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
           }
        }).execPopulate()
       res.send(req.user.tasks)
    } catch(e){
       res.status(500).send()
    }
  })
  router.get('/mytasks', auth, async (req,res)=>{
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
           path:'myTasks',
           match,
           options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
           }
        }).execPopulate()
       res.send(req.user.myTasks)
    } catch(e){
       res.status(500).send()
    }
  })
router.get('/tasks/:id', auth, async (req,res) =>{
    const _id = req.params.id
    try{
       const task = await Task.findOne({_id, owner: req.user._id})
      if(!task){
        return res.status(404).send()
    }
    res.send(task)
    } catch(e){
        res.status(500).send()
    }     
  
  })



router.patch(('/tasks/:id'), auth, async (req,res) =>{
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed','billingMethod', 'hours', 'accepted', 'editOwner', 'paymentMethod']
  const isValidOperation = updates.every((update)=>{
    return allowedUpdates.includes(update)
})

if(!isValidOperation){
    return res.status(400).send({error: "Invalid Updates"})
}
try{
    const task = await Task.findById({_id: req.params.id, owner:req.user._id })
    if(!task){
        const task = await Task.findById({_id: req.params.id, sender:req.user._id })
        if(!task){
        return res.status(404).send()
        }
    }
    
    updates.forEach((update)=>{
        task[update] = req.body[update]
    })
    await task.save()
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
    res.send(task)
  
  } catch(e){
     res.status(400).send(e)
  }
  


})

router.delete(('/tasks/:id'), auth, async (req,res) =>{
try{
    const task = await Task.findOneAndDelete({_id:req.params.id , owner: req.user._id})
    if(!task){
        res.status(404).send("Task not Found")
    }
    res.status(200).send(task)
} catch(e){

    res.status(500).send("Task not Found")
}

})
router.post('/tasks', auth, async (req, res) =>{
    // const task = new Task(req.body)
    const task = new Task({
         ...req.body,
         owner: req.user._id

    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
   })
   router.post('/thetasks', async (req, res) =>{
    // const task = new Task(req.body)
    const task = new Task({
         ...req.body,

    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
   })

router.post('/tasks/findtaskId', auth, async (req,res) =>{
    const description = req.body.description
    try{
       const task = await Task.findOne({description, owner: req.user._id})
      if(!task){
        return res.status(404).send("Task Not Found")
    }
    res.send(task._id)
    } catch(e){
        res.status(500).send()
    }     
  
})

module.exports = router