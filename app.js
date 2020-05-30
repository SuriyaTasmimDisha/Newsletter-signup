//jshint esversion: 6
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
   var firstName = req.body.fname;
   var lastName = req.body.lname;
   var email = req.body.email;

   var data = {
     members: [
       {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName
       }
     }
     ]
   };

   var jsonData = JSON.stringify(data);

   var options = {
      url: "https://us10.api.mailchimp.com/3.0/lists/f7d97f3eea",
      method: "POST",
      headers: {
        "Authorization": "Disha 6dffd3b9f3c3d5895e9b2535d24ac944-us10"
      },
      body: jsonData
   };

   request(options, function(error, response, body){
      if(error){
        res.sendFile(__dirname + "/failure.html");
      } else{
            if(response.statusCode == 200){
               res.sendFile(__dirname + "/success.html");            }
            else{
               res.sendFile(__dirname + "/failure.html");            }
      }
   });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});

//6dffd3b9f3c3d5895e9b2535d24ac944-us10

//f7d97f3eea
