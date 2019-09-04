var express = require('express')
var router = express.Router();
const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'test'
})

db.connect()

/*GET home page.*/
router.get('/data',(req,res)=>{
    var sql = 'SELECT * FROM dog'
    db.query(sql,(err,result)=>{
        if(err){
            throw err
        }

        console.log(result)
        res.send(result)
    })
});

router.post('/data',(req,res)=>{
    console.log(req.body);
    var sql = 'INSERT INTO dog SET ?'
    var data ={name:req.body.name, age:req.body.age}
    db.query(sql,data,(err,result)=>{
        if(err) {
            throw err
        }
        console.log(result)
        res.send({
            status:"data input",
            no:null,
            name:req.body.name,
            age : req.body.age
        })
    })
})



module.exports = router;