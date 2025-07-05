const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,enum:['easy','medium','hard'],
        required:true},
})

module.exports=mongoose.model("Question",QuestionSchema);