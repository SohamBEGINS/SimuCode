const express=require("express");
const router=express.Router();

const {getRandomQuestion , scoreUserInput}=require("../controllers/questionController");

router.get("/",getRandomQuestion);
router.post("/score" , scoreUserInput);

module.exports=router;