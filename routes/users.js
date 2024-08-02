const express = require("express");
const db = require("../data/db");
const router = express.Router();


router.use("/boxes/level_:box_name", async (req,res) => {

    try{
        
        const [data,]= await db.execute("SELECT * FROM words  where level = ?",[req.params.box_name]);
        res.render("boxes", {data : data }); 
    }
    catch(err){
        console.log(err);
    }
});

router.use("/mybox", (req,res)=>{
    res.render("mybox"); 
});

router.use("/a", (req,res)=>{
    res.render("a"); 
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