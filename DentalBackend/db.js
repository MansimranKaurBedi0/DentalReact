const mongoose=require('mongoose');
const url = process.env.MONGO_URI || "mongodb://localhost:27017/dental";
const connectMongoose=async ()=>{
  try{
    await mongoose.connect(url);
    console.log("Connected");
  }
  catch(error) {
    console.log("❌ MongoDB connection error:", error);
  }
}
module.exports=connectMongoose;