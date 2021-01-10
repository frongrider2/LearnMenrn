const admin = require('../firebase');

const User = require("../models/user")

exports.authCheck =async(req,res,next)=>{
    // console.log(req.headers); //token
    try{
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        console.log("Firebase user in authcheck",firebaseUser)
        req.user = firebaseUser
    }
    catch{
        res.status(401).json({
            err:"Invalid or expired token"
        })
    }
    next()
}

exports.adminCheck = async (req,res,next)=>{
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    req.user = firebaseUser
    const email = firebaseUser.email
    const adminUser = await User.findOne({email}).exec()

    if(adminUser.role !== "admin"){
        res.status(403).json({
            err: "Admin resource. Access denied"
        })
    }else{
        next();
    }
}