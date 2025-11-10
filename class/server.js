const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash")
let sessioncom = { secret:"mysupersecretstring",resave: false, saveUninitialized: true};
const path = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


app.use(session(sessioncom));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.errormsg = req.flash('error');
    res.locals.success = req.flash("success");
    next();
})

app.get("/test",(req,res)=>{
    res.send("succcesss!")
})

app.get("/login",(req,res)=>{
    let {name = 'anonyms'}= req.query;
    req.session.name = name;
    if(name==='anonyms'){
        req.flash('error','user not registered');
    }else{
    req.flash('success','user login successfully')
    }
    res.redirect('/hello');
})

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
})
// app.get("/request",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//     req.session.count = 1;
//     }
//     res.send(`you entered a session ${req.session.count} times` );
// })

app.listen(3000,()=>{
    console.log("Server run at 3000");
})