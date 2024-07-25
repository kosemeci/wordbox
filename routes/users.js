const express = require("express");
const db = require("../data/db");
const router = express.Router();


router.use("/boxes/level_:box_name", (req,res)=>{
    const boxName = req.params.box_name;
    res.render("boxes",{ box_name : boxName }); 
});

router.use("/mybox", (req,res)=>{
    res.render("mybox"); 
});

//routes yapısı
router.use("/", (req,res)=>{
    //res.send("ana sayfadasın"); 
    //send ile bilgi gönderiliyo json olarak
    res.render("index"); 
    // render ile ejs klasörünü bulup ona gidiyor
});




module.exports = router;