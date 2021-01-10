const express = require('express');

const router = express.Router();

// import
const {creteOrupdateuser} = require('../controllers/auth');

router.get("/user2",creteOrupdateuser)

module.exports = router;