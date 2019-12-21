const glob = require('glob')
const pug = require('pug')
const fs = require('fs');


const removeLeadingPath = (item) => item.split("/").slice(2).join('/');

const scripts = glob.sync('./dist/**/*.js').map(script => removeLeadingPath(script));
const styles = glob.sync('./dist/**/*.css').map(styles => removeLeadingPath(styles));

const options = { 
  title: "Marie-Maxime Tanguay | Web Developer | Portfolio", 
  description: 'Marie-Maxime Tanguay, Fullstack Web Developer in Montreal',
  scripts, styles,
}

const html = pug.renderFile('./views/index.pug', options);
fs.writeFileSync("dist/index.html", html)

