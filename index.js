const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const HTML = new generateHTML;
const pdf = require("html-pdf");
const options = { format: "Letter"};

// prompt user for colour choice and GitHub username
inquirer.prompt([
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favourite colour?",
    choices: [
      "green",
      "blue",
      "pink",
      "red"
    ]
  },
]).then(function({username, color}) {
  const queryUrl = `https://api.github.com/users/${username}`;
  console.log(queryUrl);
  
  axios.get(queryUrl).then(function(res) {
    generatePDF(res, color);
    // create PDF using HTML to PDF package
    function generatePDF() {
      // const pdf = require("phantom-html-to-pdf");
      const newHTML = HTML.generateHTML(res, color);
      pdf.create(newHTML, options).toFile(username + ".pdf", function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });
    }
  });
})




