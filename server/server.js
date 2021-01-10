const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require("fs")


require("dotenv").config();


// app
const app = express();

// db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify:true
}).then(()=>console.log("DB Connect")).catch((err) => console.log("DB connection err:",err));

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limited:"2mb"}))
app.use(cors());


// route middleware
fs.readdirSync("./routes").map((r)=>
    app.use("/api",require("./routes/"+r))
)

//Port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`server running on ${port}`))