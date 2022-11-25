const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const { post } = require('request');



const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.listen(2000,function(){
    console.log("Server is running on port 2000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/',function(req,res){

    var CryptName = req.body.crypto;
    var FiatName = req.body.fiat;
    var amount = req.body.amount;
    
    var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/";
    
    option = {
        url : baseURL,
        method : "GET",
        qs : {
            from:CryptName,
            to:FiatName,
            amount:amount
        }
    }// 
    
    console.log();
    console.log(option);
    console.log();

        request( option,function(error,response,body){
        var data = JSON.parse(body);//converting the body into javascript
        var price =data.price;
        console.log("Prince :" + price);
        var currentDate = data.time;

        res.write("<p>The current date is : " + currentDate +"</p>");
        res.write("<h1>The price of " + CryptName + " is " + price + FiatName );

        res.send();//this is like hitting the send function
        });

        
});



// app.post(".../BTCUSD"){

// }

// app.post(".../ETHEUR"){

// }

