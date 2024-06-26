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












module.exports = router