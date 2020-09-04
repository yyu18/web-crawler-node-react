const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobs', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).catch(err=>console.log(err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});
mongoose.set('useCreateIndex', true);

const jobSchema = new mongoose.Schema({
  title:{ type:String, required:true },
  locationCom:{ type:String, required:true },
  company:{ type:String, required:true }
})

const Jobs = mongoose.model('Jobs',jobSchema)

const createJob = (info)=>{
  return new Promise((resolve,reject)=>{
    Jobs.create(info,(err,usr)=>{
      if(err) reject(err)
      resolve(usr)
    })
  })
}

const updateJob = (id,info)=>{
  return new Promise((resolve,reject)=>{
    Jobs.replaceOne({ _id:id },info,(err,usr)=>{
      if(err) reject(err)
      resolve(usr)
    })
  })
}

const retrieveJob = ()=>{
  return new Promise((resolve,reject)=>{
    Jobs.find({},(err,usr)=>{
      if(err) reject(err)
      resolve(usr)
    })
  })
}
const deleteJob = (id,callback)=>{
  Jobs.deleteOne({ _id:id }, (err,usr) => {
    if (err) return callback(err)
    return callback(null,usr)
  });
}

module.exports = { createJob, updateJob, deleteJob, retrieveJob }