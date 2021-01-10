const User = require("../models/user")



exports.creteOrupdateuser = async (req,res) =>{

    const {name,picture,email}=req.user;
    console.log(name,picture,email)

    const user = await User.findOneAndUpdate({email},{name,picture},{new:true})

    if(user){
        console.log("user updated",user)
        res.json(user)
    } else{
        const newUser = await new User({
            email,
            name,
            picture
        }).save();
        console.log("user created",newUser)
        res.json(newUser)
    }
}

exports.currentuser = async (req,res)=>{
    User.findOne({email:req.user.email}).exec((err,user)=>{
        if(err) throw new Error(err);
        res.json(user);
    })
}