const ex = require("express");
const app = ex();
const cors = require("cors")
const db = require("./db")

app.use(cors())
app.listen(555, () =>{
    console.log("servidor desplegado");
})

app.get("/ping" , (req,res) =>{
    res.send({
        fecha: new Date()
    })
});

app.get("/producto", async(req,res)=>{
    try{
        const [result, fields] =await db.q("select * from Products", []);
        res.send(result)

    }catch(err){
        console.log("hay un error con "+err);
    }
})


app.get("/producto/:id", async(req,res)=>{
    try{
        const [result, fields] =await db.q("select * from Products where ProductID = ? ", [req.params.id]);
        res.send(result)

    }catch(err){
        console.log("hay un error con "+err);
    }
})

