require("dotenv").config();
require("./api/data/db");
const routes=require("./api/routes");
const express=require("express");
const app=express();
app.use(express.json());

//CORS
app.use("/api",function(req,res,next){
  res.header('Access-Control-Allow-Origin','http://localhost:4200');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})



app.use(express.urlencoded({extended:true}));
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use("/api",routes);

const server=app.listen(process.env.PORT,function(){
    console.log(process.env.SERVER_START_MSG,server.address().port);
})