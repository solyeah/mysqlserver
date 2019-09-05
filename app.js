const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const router = require('./routes/index')
const mysql = require('mysql')
app.set('views' , __dirname+'/views')
app.set('view engine','ejs')
app.engine('html' ,require('ejs').renderFile)
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(cors())
const db = mysql.createConnection({
   host : 'localhost',
   user :  'root',
   password :'1234',
   database : 'test'
})
db.connect(()=>{console.log("Data is connected")})
/* GET home page. */
app.get('/', (req, res)=> {
       res.send("result");
   })
app.get('/data', (req, res)=> {
 var sql = 'SELECT * FROM dog'
 db.query(sql, (err ,result)=>{
     if(err) {
         throw err
     }
     console.log(result);
     res.send(result);
 })
});
app.post('/data',(req ,res) =>{
   console.log(req.body);
   var data ={name:req.body.name , age:req.body.age}
   var sql = 'INSERT INTO dog SET ?'
   db.query(sql, data, (err ,result)=>{
       if(err) {
           throw err
       }
       console.log(result);
       res.send({
           status: "data input",
           no:null,
           name:req.body.name,
           age : req.body.age
       });
})
})
app.listen(3000, ()=>{
   console.log("서버가 3000포트에서 실행했습니다. http://localhost:3000")
})