// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const router = express.Router()


router.get('/', (req,res)=>{
   Project.get()
   .then(proj =>{
       res.json(proj)
   })
})


router.get('/:id', async (req,res)=>{
    try{
        const wantedPost = await Project.get(req.params.id)
        if(!wantedPost){
            res.status(404).json({
                 message: "The post with the specified ID does not exist"
            })          
          }else{
              res.json(wantedPost)
          }
 }catch (err){
     res.status(500).json({
         message:'The post with the specified ID does not exist'
     })
 }

})

router.post('/',(req,res) =>{
    const {name,description,completed} = req.body

    if(!name || !description){
        res.status(400).json({
            message: 'Please provide all fields'
        })
    }else{
        Project.insert({name, description, completed})
         
        .then(proj=>{
            res.status(200).json(proj)
        })
        .catch(err=>{
            res.status(500).json({
                message:'there was an error adding project to database'
            })
        })
    }

})












module.exports = router