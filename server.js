var mongoClient=require('mongodb').MongoClient;
var jwt=require('jsonwebtoken');
const cors=require('cors');
var express=require('express');
const verifyToken = require('./verifyToken');
var app=express();
app.use(cors());
app.use(express.json());
let db
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log(error);
    }
    else{
        db=client.db('emps')
        console.log('Connection established successfully');
    }
})
app.get("/getdata",(req,res)=>{
    db.collection("emp").find().toArray((err,items)=>{
        console.log(items);
        res.json(items);
    
    })
})
app.post("/addemp",(req,res)=>{
    db.collection("emp").insertOne(req.body);
    res.json(req.body);
    console.log("Employee data is inserted");
})
app.delete("/deleteemp/:id",(req,res)=>{
    var id=Number(req.params.id);
    db.collection('emp').remove({_id:id})
   res.json("Deleted successfully");
})
app.put("/updateemp/:id",(req,res)=>{
    var id=Number(req.params.id);
    db.collection('emp').update({_id:id},{$set:{branch:"MTech"}})
    res.json("Updated successfully");
})
app.post('/login',(req,res)=>{
    uname=req.body.username;
    pwd=req.body.password;
    db.collection('users').insertOne(req.body)
    const token=jwt.sign(req.body,"cvrcollege");
    res.json(token);
    // db.collection('users').find({"username":uname,"password":pwd}).toArray((err,item)=>{
    //     if(item)
    //     {
    //         const token=jwt.sign({username:uname},"cvrcollege");
    //         res.json({
    //             success:true,
    //             message:"Authentication successful",
    //             token:token
    //         })
    //         res.end();
    //     }
    //     else{
    //         res.json({success:false,
    //             message:"No username & password"
    //         })
    //         res.end();
    //     }
    // })
    // .catch((err)=>{
    //     console.log("error",err);
    // })
})
app.get("/login",verifyToken,(req,res)=>{
    uname=req.body.username;
    pwd=req.body.password;
    db.collection('users').find({"username":uname,"password":pwd}).toArray((err,item)=>{
        if(item)
        {
           
            res.json({
                success:true,
                message:"Authentication successful",
                // token:token
            })
            return res.json(item)
           
        }
        else{
            res.json({success:false,
                message:"No username & password"
            })
            res.end();
        }
    })
})
app.listen(4000,()=>{
    console.log("Server started");
})

