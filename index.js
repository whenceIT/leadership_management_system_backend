const express = require('express')
const app = express()
const cors = require("cors")
const pool = require("./db");
const http = require("http")
const bodyParser = require("body-parser");

   
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));


app.post("/sign-in",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = ? `,[email])
        const userPassword =  user[0][0].password
        console.log(userPassword)
        const finalPassword = userPassword.replace("$2y$", "$2b$")
        console.log(finalPassword)
       // console.log(finalPassword)
        const isPasswordMatching = bcrypt.compareSync(password,finalPassword)
        console.log(isPasswordMatching)
        res.json(user[0][0])
    }catch(err){
        console.log(err)
    }
})









app.listen(5000,()=>{
    console.log('Server is up and running');
})