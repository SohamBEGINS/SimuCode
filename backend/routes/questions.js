const express=require("express");
const router=express.Router();

const {getRandomQuestion , scoreUserInput ,clarify}=require("../controllers/questionController");

router.get("/",getRandomQuestion);
router.post("/score" , scoreUserInput);
router.post("/clarify",clarify);


module.exports=router;