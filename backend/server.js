require("dotenv").config();
const express=require("express");
const connectDB=require("./db");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/questions",require("./routes/questions"));

connectDB().then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})