const User = require("../models/user.js");

module.exports.getSignup = async(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postSignup = async(req,res)=>{
    try{
    let {username,email,password}= req.body;
    const newUser = new User({username,email});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","Congratulation, Welcome to WanderLust");
        res.redirect("/listing")
    });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.getLogin = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.postLogin = async (req, res) => {
  req.flash("success", "Welcome Back to Wanderlust");
  const redirectUrl = req.session.redirectUrl || "/listing";
  delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged Out");
        res.redirect("/listing");
    })
}