const express=require("express");
const mongoose=require("mongoose");
const ObjectId=require("mongoose").Types.ObjectId;

const User=require("../model/user");
const route=express.Router();

//Function to get all the records from DB
route.get("/getAll", (req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log(JSON.stringify(err));
        }
    });
});

//Function to get the record with a particular id
route.get("/:id",(req,res)=>{
    let recordId=req.params.id;
    if(!ObjectId.isValid(recordId))
        return res.status(400).send(`No Data with given id: ${recordId}`);
    User.findById(recordId,(err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log(JSON.stringify(err));
        }
    });
});

//Funcion to add a record
route.post("/addData",async (req,res)=>{
    const {name, position, location, salary}=req.body;

    let user={};
    user.name=name;
    user.position=position;
    user.location=location;
    user.salary=salary;

    let usermodel=new User(user);
    await usermodel.save((err,docs)=>{
        if(!err){
            console.log(JSON.stringify(docs));
            //res.send("Data Saved Successfully");
        }
        else{
            console.log(JSON.stringify(err));
        }
    });
});

//Function to update a record based on the specified Id
route.put("/:id", (req,res)=>{
    let recordId=req.params.id;
    if(!ObjectId.isValid(recordId))
        return res.status(400).send(`No Data with given id: ${recordId}`);
    const {name, position, location, salary}=req.body;
    let user={};
    user.name=name;
    user.position=position;
    user.location=location;
    user.salary=salary;
    
    User.findOneAndUpdate({_id:recordId},{$set:user},{useFindAndModify:false,new:true},(err,doc)=>{
        if(!err){
            res.send("Data Updated Successfully: "+doc);
        }
        else{
            console.log(JSON.stringify(err));
        }
    });
    let usermodel=new User(user);

});

//Function to delete a specific record
route.delete("/:id",(req,res)=>{
    let recordId=req.params.id;
    console.log(recordId);
    if(!ObjectId.isValid(recordId))
        return res.status(400).send(`No Data with given id: ${recordId}`);
    User.findOneAndDelete({_id:recordId},(err,doc)=>{
        if(!err){
            //res.send("Data Deleted Successfully: \n"+doc);
        }
        else{
            console.log(JSON.stringify(err));
        }
    });
    
});

module.exports=route;