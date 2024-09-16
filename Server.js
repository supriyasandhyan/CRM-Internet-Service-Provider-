const express = require('express')
const dotenv = require("dotenv")
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require('./db');

//dot env
dotenv.config();

//db connectn
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/", require('./Routes/AuthRoutes'))
app.use('/api/v1/', require('./Routes/CreatePlanRoutes'));
app.use("/api/v1/", require('./Routes/EmpRoutes'))
app.use("/api/v1/", require('./Routes/CustRoutes'))


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, ()=>{
    console.log(`node server is running on port ${process.env.PORT}`.bgGreen.white); 
})



