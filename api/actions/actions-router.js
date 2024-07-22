// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')
const router = express.Router()


router.get('/', (req,res)=>{
    Actions.get() 
    .then(act=>{
        res.status(200).json(act)
    })
})
router.get('/:id', async (req,res)=>{
    try{
        const wantedActions= await Actions.get(req.params.id)
        if(!wantedActions){
            res.status(404).json({
                message:'This action does not exist'
            })
        }else{
            res.status(200).json(wantedActions)
        }
    }catch (err){
        res.status(500).json({
            message:'The project with the specified ID does not exist'
        })
    }
})

router.post('/', async (req,res)=>{
    
    const {description,notes,completed,project_id} = req.body
    
    const pr1 = await Projects.get(req.body.project_id)
       console.log('here',pr1)
    if(!description || !notes || typeof completed !== 'boolean' || !pr1 ){
        res.status(400).json({
            message:'One of the required fields is missing'
        })
    }else{
        Actions.insert({description,notes,completed,project_id})
        .then(act=>{
            res.status(200).json(act)
        })
        .catch(err=>{
            res.status(500).json({
                message:'There was an error adding action'
            })
        })
    }

})

router.put('/:id', (req,res)=>{
    const {description,notes,completed} = req.body

    if(!notes || !description || typeof completed !== 'boolean'){
        res.status(400).json({
            message:'ONE OF THE REQUIRED FIELDS IS MISSING'
        })
    }else{
        Actions.get(req.params.id)
        .then(act=>{
            if(!act){
                res.status(404).json({
                    message:'The action with the specified id doesnt exist'
                })
            }else{
                return Actions.update(req.params.id,req.body)
            }
        })
            .then(data=>{
                if(data){
                    return Actions.get(req.params.id)
                }
            })
            .then(act=>{
                res.json(act)
            })
            .catch(err=>{
                res.status(400).json({
                    message:'this action cant be retrieved'
                })
            })
    }
})
    router.delete('/:id',  async (req,res)=>{
        try{
            const action =  await Actions.get(req.params.id)
            if(!action){
                res.status(404).json({
                    message:'this project doesnt exist'
                })
            }else{
                 await Actions.remove(req.params.id)
                res.json({message:'the action was deleted'})
            }
        }catch(err){
            res.status(500).json({
                message:'this action cant be found'
            })
        }
    })

   





module.exports = router