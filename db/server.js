const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    console.log("api/notes run")
    readFileAsync("db.json", "utf8").then(data=>{
        return res.json(data)
    })
})

app.post("/api/notes", function(req, res) {
    var newNotes = req.body;
    newNotes.routeName = newNotes.name.replace(/\s+/g, "").toLowerCase();
    console.log(newNotes)
})

app.get(`*`, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});