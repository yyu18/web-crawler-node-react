const express = require('express')
const { getDom } = require('../functions')
const { createJob, updateJob, retrieveJob, deleteJob } = require('../mongoHandler/dbConnect')
var router = express.Router()

const { GeneralError, BadRequest, NotFound, Unauthorized, Forbidden } = require('../utils/error')

router.post('/jobs',async(req,res,next)=>{
    try{
        let job = req.body.job
        if(!job) throw new BadRequest('Job Empty')
        let result = await createJob(job)
        res.sendStatus(201,'application/json',{
            error:false,
            info:result
        })
    } catch(err) {
        next(err)
    } 
})

router.put('/jobs/:id',async(req,res,next)=>{
    try{
        let job = req.body.job
        let id = req.params.id
        if(!job) throw new BadRequest('Job Empty')

        let result = await updateJob(id,job)
        res.sendStatus(202,'application/json',{
            error:false,
            info:result
        })
    } catch(err) {
        next(err)
    }
})

router.get('/jobs',(req,res,next)=>{
    let q = req.query.q
    let start = req.query.start
    if(!(q&&start)) 
        return retrieveJob().then(usr=>{
            res.sendStatus(200,'application/json',{
                error:false,
                info:usr
            })
        }).catch(err=>{
            next(new BadRequest(err))
        })
    
    const url = 'https://ca.indeed.com/jobs?q='+q+'&start='+start
    getDom(url).then(result=>{
        res.sendStatus(200,'application/json',{
            error:false,
            info:result
        })
    }).catch(err=>{
        next(new NotFound(err))
    })
})

router.delete('/jobs/:id',(req,res,next)=>{
    let id = req.params.id
    deleteJob(id,(err,usr)=>{
        if(err) return next(err)
        res.sendStatus(200,'application/json',{
            error:false,
            info:usr
        })
    })
})

module.exports = { router } 