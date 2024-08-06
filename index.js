const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));

app.set("view engine" , "ejs");

app.get("/" , (Request , Response) => {
    fs.readdir(`./Files` , (Error , Files) => {
        if(Error) console.log(Error.message);
        else Response.render("index.ejs" , {files : Files});
    })
})

app.post("/Create" , (Request , Response) => {
    let {Title , Details} = Request.body;

    fs.writeFile(`./Files/${Title.split(" ").join("")}.txt`, Details, (Error) =>{
        if(Error) console.log(Error.message);
        else Response.redirect("/");
    })
})

app.get("/Read/:filename" , (Request, Response) => {
    let FileName = Request.params.filename;

    fs.readFile(`./Files/${FileName}`, "utf-8", (Error , Data) => {
        if(Error) console.log(Error.message);
        else Response.render("show.ejs", {FileName , Data});
    })

});

app.get("/Delete/:filename" , (Request , Response) => {
    let FileName = Request.params.filename;

    fs.unlink(`./Files/${FileName}`, (Error) => {
        if(Error) console.log(Error.message);
        else Response.redirect("/");
    })
})

app.listen(4000);