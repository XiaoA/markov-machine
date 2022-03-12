/** Command-line tool to generate Markov text. */


const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let markovMachine = new markov.MarkovMachine(text);
  console.log(markovMachine.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(error, data) {
    if (error) {
      console.error(`Cannot read file: ${path}: ${error}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


/** read URL and make text from it. */


async function makeURLText(url) {
  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(`Cannot read URL: ${url}: ${error}`);
    process.exit(1);
  }
  generateText(response.data)
}


/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
