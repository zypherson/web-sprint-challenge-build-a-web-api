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
                 message: "The project with the specified ID does not exist"
            })          
          }else{
              res.json(wantedPost)
          }
 }catch (err){
     res.status(500).json({
         message:'The project with the specified ID does not exist'
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

  router.delete('/:id', async (req,res)=>{
      try{
          const deleted = await Project.get(req.params.id)
          if(!deleted){
              res.status(404).json({
                  message:'This project does not exist'
              })
          }else{
            await Project.remove(req.params.id)
            res.json(deleted)
          }
      }catch(err){
        res.status(500).json({
            message:'this project could not be removed '
        })
      }
  })

    router.put('/:id', (req,res) =>{
        const {name,description,completed} = req.body
        if(!name || !description || typeof completed != 'boolean' ){
        res.status(400).json({
            message: 'Please provide name, description, and completion status'
        })
         }else{
            Project.get(req.params.id)
            .then(proj =>{
               if(!proj){
                  res.status(404).json({
                      message:'The project with the specified ID does not exist'
                  }) 
               }else{
                  return Project.update(req.params.id, req.body) 
               }
            })
            .then(data=>{
                if(data){
                    return Project.get(req.params.id)
                }
            })
            .then(project =>{
                res.json(project)
            })
            .catch(err=>{
                res.status(400).json({
                    message:'the project information could not be retrieved'
                })
            })
     }
    })
    

    router.get('/:id/actions', async (req,res)=>{
        try{
            const wantedActions = await Project.get(req.params.id)
            if(!wantedActions){
                res.status(404).json({
                    message:'This project with this specified ID could not be found'
                })
            }else{
                Project.getProjectActions(req.params.id)
                .then(actions =>{
                    res.json(actions)
                })
            }

        }catch (err){
            res.status(500).json({
                message:'this project could not be removed'
            })
        }
    })












module.exports = router