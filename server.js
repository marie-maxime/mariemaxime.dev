const path = require("path");
const express = require("express");
const glob = require( 'glob' )
const pug = require('pug')
const app = express();
const port = process.env.PORT || "8000";
const fs = require('fs');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, "/dist")));


const removeLeadingPath = (item) => item.split("/").slice(2).join('/');


app.get("/", (req, res) => {
  const scripts = glob.sync( './dist/**/*.js' ).map( script => removeLeadingPath(script) ) ;
  const styles = glob.sync( './dist/**/*.css' ).map( styles => removeLeadingPath(styles) ) ;

  const options = { 
    title: "Marie-Maxime Tanguay | Portfolio | Web Developer", 
    description: 'Marie-Maxime Tanguay, Frontend Web Developer in Montreal',
    scripts, styles,
  }

  res.render("index", options);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});