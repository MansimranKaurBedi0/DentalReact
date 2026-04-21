const express=require('express');
const router=express.Router();
const Appointment=require('../Model/AppointmentModel');//importing Schema/model
const sendMail = require('../utils/sendMail');

const {body, validationResult}=require('express-validator');//Adding Validations
//Booking Appointment By Patients
router.post('/appointment',[body("name").notEmpty().withMessage("Name is required"),
  body("phone").isLength({min:10,max:10}).withMessage("Enter valid phone number"),
body("email").isEmail().withMessage("Enter a valid email"),
 body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time is required"),
],async(req,res)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
try{
const user=new Appointment({
  name:req.body.name,
  phone:req.body.phone,
  email:req.body.email,
  date:req.body.date,
  time:req.body.time,
  message:req.body.message
})
await user.save();
res.status(201).json({ message: "Done" })
}
catch(err){
 console.error(err);
    res.status(500).json({ message: "errors" });
}
})

//Viewing Appointments by Admin
router.get("/view", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const query = { isDeleted: false };
    
    const appointments = await Appointment.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }); // Sorting by newest first
      
    const total = await Appointment.countDocuments(query);

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalAppointments: total
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});


//Updating  Appointment by Admin
router.put("/accept/:id",async(req,res)=>{
  try{
  const id=req.params.id;
  const appointment=await Appointment.findByIdAndUpdate(id,{status:"accepted"},{ new: true });
  if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await sendMail(
      appointment.email,
      "Appointment Accepted",
      `Hello ${appointment.name}, your appointment on ${appointment.date} at ${appointment.time} has been accepted!`
    );
  res.json(appointment);
  }
  catch(err){
     console.error(err);
    res.status(500).json({ message: "Error accepting appointment" });
  }
})

//Decline
router.put("/decline/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndUpdate(id, { status: "declined" }, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await sendMail(
      appointment.email,
      "Appointment Declined",
      `Hello ${appointment.name}, we are sorry to inform you that your appointment on ${appointment.date} at ${appointment.time} was declined.`
    );

    res.json({ message: "Appointment declined and email sent!", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error declining appointment" });
  }
});

// Soft Delete Appointment
router.put("/soft-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    res.json({ message: "Appointment deleted successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting appointment" });
  }
});

module.exports = router;
