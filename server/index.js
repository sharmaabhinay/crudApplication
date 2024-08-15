const bcdata = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
let PORT = 4100;


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=> {
  console.log('data connected')
  res.send('shri ganesh')
})
//get user details in admin panel
app.get('/users', async (req, res) => {
  try {
    let data = await bcdata.find();
    // console.log('>>>>>>>>>', data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
//new user register
app.post('/register-user', async (req, res) => {
  console.log(req.body)
  const { username, email, phone, city , gender,dob,qualification} = req.body;
  const data = {
    username: username,
    email: email,
    phone: phone,
    city: city,
    gender:gender,
    dob:dob,
    datecreated:new Date().toLocaleDateString(),
    qualification:qualification
  };
  try {
    const check = await bcdata.find({ email: data.email });
    if (check.length === 0) {
        await bcdata.insertMany({
        name: data.username,
        email: data.email,
        phone: data.phone,
        city: data.city,
        gender:data.gender,
        dob:data.dob,
        date:data.datecreated,
        qualification:data.qualification
        
      });
      res.json('submited')
    }else {
       res.json('exists');
    }
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

app.delete('/delete/:id' ,async (req,res) => {
    console.log(req.params.id)
    try{

        await bcdata.deleteOne({_id:req.params.id})
        res.send('deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

//put / upate the data
app.put('/update' ,async (req,res) => {
  let {id,name,email,phone,city} = req.body;
  const data = {
    id:id,
    name:name ,
    email:email,
    phone:phone,
    city:city
  }
  try{
      await bcdata.updateOne({_id:id},{$set:{...data}})
      res.send('data updated')
  }catch(err){
      res.status(500).json(err)
  }
})

//genger fileter
app.post('/genders',async(req,res)=> {
  try{
    let result = await bcdata.find({gender:req.body.gender})
    res.send(result)
  }catch(err){
    throw err;
  }
})

//grade filter
app.post('/qualificationfilter',async(req,res)=> {
  console.log(req.body.grade)
  try{
    let result = await bcdata.find({qualification:req.body.grade})
    res.send(result)
  }catch(err){
    throw err
  }
})
app.post('/search',async(req,res)=> {
  const searchTerm = req.body.data;

  let searchQuery = { "$regex": new RegExp(searchTerm, 'i') };
  let phoneQuery = isNaN(searchTerm) ? null : Number(searchTerm);

  try {
    let result = await bcdata.find({
      "$or": [
        { name: searchQuery },
        { city: searchQuery },
        { phone: phoneQuery },
        { email: searchQuery }
      ]
    });
    res.send(result);
    console.log(result);
  } catch(err){
    console.log(err)
  }
})

app.get('/userdata/:id',async (req,res)=> {
  console.log(req.params.id)
  try{
    let result = await bcdata.find({_id:req.params.id})
    res.json(result)
  }catch(err){
  }
})

app.listen(PORT);
