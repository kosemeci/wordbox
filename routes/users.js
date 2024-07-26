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
router.use("/", async (req,res)=>{
    const query = "SELECT level, COUNT(*) AS count FROM words  GROUP BY level ORDER BY level ASC;";
    try{
        const [data,]= await db.execute(query);
        res.render("index",{
            words : data,
        }); 
    }
    catch(err){
        console.log(err);
    }

});




module.exports = router;