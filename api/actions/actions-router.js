// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
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






module.exports = router