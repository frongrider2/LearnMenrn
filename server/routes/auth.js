const express = require('express');

const router = express.Router();

// middleware
const {authCheck,adminCheck} = require("../middleware/auth")

// controller
const {creteOrupdateuser,currentuser} = require('../controllers/auth');

// const mymiddleware =(req,res,next)=>{
//     console.log("I am middleware")
//     next();
// }

router.post("/crete-or-update-user",authCheck,creteOrupdateuser)
router.post("/current-user",authCheck,currentuser)
router.post("/current-admin",adminCheck,currentuser)




module.exports = router;