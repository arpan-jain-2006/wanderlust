const express = require("express");
const app = express();
// const Expresserror = require("./Expresserror");

// app.use((req,res,next)=>{
//     console.log("hi i am a middleWare",Date.now());
//     next();
// })

app.use((req,res,next)=>{
    req.time= new Date(Date.now()).toDateString();
    console.log(req.method,req.hostname,req.path,req.time);
    next();
})



// app.use("/random",(req,res,next)=>{
//     console.log("This is random page");
//     next();
// })
// 
// app.use("/api",(req,res,next)=>{
//     let{token}= req.query;
//     if(token === "giveaccess"){
//         next(); 
//     }
//     throw new Expresserror(401,"ACCESS DENIED")
// })
// 
// 
// app.get("/api",(req,res)=>{
//     res.send("DATA FOUND LOGIN SUCCESSFULLY");
// })
// app.get("/",(req,res)=>{
//     res.send("HI i am root")
// })
// 
// app.get("/random",(req,res)=>{
//     res.send("Hi, i am rand");
// })
// app.get("/admin",(req,res)=>{
//     throw new Expresserror(403,"Access Forbidden error");
// })
// 
// app.get("/err",(req,res)=>{
//     abcd = abcd ;
// })
// 
// app.use((err,req,res,next)=>{
//     let{status,message} = err;
//     res.status(status).send(message);
// })
// app.use((req,res)=>{
//     res.send("404 Page Not Found");
// })

app.use("/api",(req,res,next)=>{
    let{token}= req.query;
    if(token==="Arpan"){
        next()
    }
    else{
        res.send("undefined");
    }
})

app.get("/api",(req,res)=>{
    res.send("Data saved...");
})
app.listen(8080,()=>{
    console.log("STARTED");
    console.log("localhost:8080");
})