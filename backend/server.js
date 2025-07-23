require("dotenv").config();
const express=require("express");
const connectDB=require("./db");
const cors=require("cors");
const stage3Routes = require('./routes/stage3')
const stage4Routes = require('./routes/stage4')
const InterviewSummaryRoutes = require('./routes/InterviewSummary')

const app=express();

app.use(cors());


app.use(express.json());

app.use("/api/questions",require("./routes/questions"));
app.use('/api/stage3', stage3Routes);
app.use('/api/stage4',stage4Routes);
app.use('/api/interview-summary',InterviewSummaryRoutes);

// Connect to database
connectDB().then(()=>{
    console.log("Connected to MongoDB");
    
    // Only start server in development
    if (process.env.NODE_ENV !== 'production') {
        app.listen(process.env.PORT || 3001,()=>{
            console.log(`Server is running on port ${process.env.PORT || 3001}`);
        })
    }
})
.catch((err)=>{
    console.log(err);
})

// Export for Vercel
module.exports = app;