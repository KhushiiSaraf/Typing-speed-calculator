const express= require('express');
const app=express();

require('dotenv').config();
// const PORT=5000;
const PORT=process.env.PORT || 5000;

//DB connect
require('./Models/db');

//cors and bodyParser
const bodyParser = require('body-parser');
const cors = require('cors');

//routers
const authRouter = require('./Routes/authRouter');
const scoreRouter = require('./Routes/scoreRouter');
const aiRouter = require("./Routes/aiRouter.js");
const textRouter = require("./Routes/textRouter.js");
const survivalRouter = require("./Routes/survivalRouter.js");

app.use(bodyParser.json());

app.use(cors()); //used to allow users to access this port(8080) if they're coming from some other port

app.get('/',(req,res)=>{
    res.send("<h1>heloooooooo</h1>");
})    
app.use('/auth',authRouter);
app.use("/score", scoreRouter);
app.use("/api", aiRouter);
app.use("/api", textRouter);
app.use("/survival", survivalRouter);



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});