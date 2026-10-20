const express = require("express");
const app = express()
const mysql = require("mysql")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path: "./.env"})

var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');


const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

db.connect((error) =>{
  if(error){
    console.log(error)
  }else{
    console.log("Database connected...")
  }
})


app.use(session({
  secret : 'webslesson',
  cookie : {maxAge : 60000},
  saveUninitialized : false,
  resave : false
}));

app.set("view engine", "ejs")
app.engine('ejs', require('ejs').__express)
app.use(express.static("public"))  
app.set("view engine", "hbs")
app.engine('hbs', require('hbs').__express)


//define routes
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());
app.use(flash());

app.use("/", require("./routes/pages"))
app.use("/auth", require("./routes/auth"))
app.use("/js", express.static(__dirname + " /public/js"))
app.use("/css", express.static(__dirname + " /public/css"))


const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory))  


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const port = 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
 
