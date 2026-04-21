require('dotenv').config();
const connectMongoose=require('./db.js');
const express=require('express');
connectMongoose();
const cors = require("cors");


const app=express();
const port=process.env.PORT || 3000;
app.use(cors());
const router=require('./Routes/Appointment');

app.use(express.json());

// Routes
app.use("/user",router);
app.use("/api/auth", require("./Routes/auth"));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

