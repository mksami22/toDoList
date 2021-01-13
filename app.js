//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
let items = [];
let workItems = [];
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("lists",{listTitle: day, newListItem:items});
});
app.post("/", function(req,res){
  let item = req.body.newItem;
  console.log(req.body);
  if(req.body.lists === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req,res){
  res.render("lists",{listTitle: "Work List", newListItem: workItems});
});
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

// app.post("/work", function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });
