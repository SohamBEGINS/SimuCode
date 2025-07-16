require("dotenv").config();
const express=require("express");
const connectDB=require("./db");
const cors=require("cors");
const stage3Routes = require('./routes/stage3')
const stage4Routes = require('./routes/stage4')

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/questions",require("./routes/questions"));
app.use('/api/stage3', stage3Routes);
app.use('/api/stage4',stage4Routes);

connectDB().then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})