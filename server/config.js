const mongoose = require('mongoose');
let  remoteUrl = 'mongodb+srv://abhiisharma76:123@cluster0.ot7wa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(remoteUrl).then(response => console.log('atlas connected')).catch(err => console.log(err))
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },email:String,
    phone:Number,
    city:String,
    gender:String,
    dob:String,
    date:String,
    qualification:String
})

module.exports = mongoose.model('users', userSchema)
