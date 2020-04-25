const db = require("../db/db.json");
const fs = require("fs")

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.send(db);
      });


    app.post("/api/notes", function(req,res){
        let newNote = {
            id: JSON.stringify(Math.random()),
            title: req.body.title,
            text: req.body.text
        };
        
        fs.readFile("Develop/db/db.json", function(err, data) {
            if (err) throw err;
            var readNote = JSON.parse(data)
            readNote.push(newNote);
            var writeNote = JSON.stringify(readNote);

            fs.writeFile("Develop/db/db.json", writeNote, function(err, data) {
                if (err) throw err;
                res.redirect("/notes");
            })
        });
    })

app.delete("/api/notes/:id", function(req,res){

    fs.readFile("Develop/db/db.json", function(err, data) {
        if (err) throw err;
        var readNote = JSON.parse(data)
        var index = readNote.findIndex(obj => obj.id === req.params.id);
        readNote.splice(index, 1);
        var writeNote = JSON.stringify(readNote);

        fs.writeFile("Develop/db/db.json", writeNote, function(err, data) {
            if (err) throw err;
            res.end();
        })
    })    
    })

}