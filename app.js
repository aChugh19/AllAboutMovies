const express = require('express')
const app = express()
const request = require('request')
require('dotenv').config();

app.set("view engine","ejs") //Middlewares
var name = "Movie Name"

app.get('/contactUs',(req,res)=>{
    res.send("Yet to design");
})

app.get('/about',(req,res)=>{
    res.render("AboutMe");
})

app.get('/movieInfo/:id',(req,res)=>{
    request(`http://www.omdbapi.com/?apikey=7963c110&i=${req.params.id}`,(error,response,body)=>{
        if(!error && response.statusCode==200){
            const data=JSON.parse(body);
            request(`http://www.omdbapi.com/?apikey=7963c110&s=${data.Title}`,(error,response,body)=>{
                var moreData = JSON.parse(body);
                res.render("movieDetails",{movieData:data,extraData:moreData}) 
            })
        }else{
            res.render("Error");           
        }    
    })
})

app.get('/search',(req,res)=>{
    request(`http://www.omdbapi.com/?apikey=7963c110&s=${req.query.mn}`,(error,response,body)=>{
        if(!error && response.statusCode==200){
            const data=JSON.parse(body);
            res.render("movieCards",{md:data}); 
        }else{
            res.render("Error");           
        }    
    })  
})

app.get('/',(req,res)=>{
    res.render("homePage",{sn: name});
})

app.get('*',(req,res)=>{
    res.render("Error")
})

app.listen(process.env.port_num,()=>{
    console.log("Server Started")
})