"use strict";

// Create a simple command-line tool that allows us to send an API request and save the results in a text file!

// Your application should perform an API request to the dad joke API (https://icanhazdadjoke.com/api) to search for a joke based on the search phrase.

// GET: https://icanhazdadjoke.com/search?term=?

// If it discovers jokes that match the phrase, it should output a random joke and save it to a file named jokes.txt.

// If it fails to discover a joke, it should log a message to the console informing the user that no jokes for that search query were found.

// A command-line option called leaderboard should be accepted. Your application should return the most popular joke depending on how many times it appears in jokes.txt if that command-line input is passed in.


//Usage: run a `node app.js`
// run `node app.js --leaderboard`.
/**
 * @author Jana Rangasamy<janagr7@gmail.com>
 */


const request = require('request')
const getMaxFromArray = require("./getMaxFromArray")
const { readFile, appendFile } = require('fs')

const getOptions = (searchText) => {
  return {
    url: "https://icanhazdadjoke.com/search?term=" + searchText,
    headers: {
      "User-Agent": "request",
      "Accept": "application/json"
    }
  }
}

const reqCallback = (error, response, body) => {
  if (error) {
    console.log(error)
    return
  }
  let parsedBody = JSON.parse(body)
  let matchedJokes = parsedBody.results

  if (matchedJokes.length > 0) {
    let randomJokeIndex = Math.round(Math.random() * (matchedJokes.length - 1))
    let randomJoke = matchedJokes[randomJokeIndex].joke
    //output the random joke to console
    console.log(randomJoke)
    saveToTxtFile(randomJoke + "\n")
  } else {
    console.log("Could not find your search text.")
  }
}

const saveToTxtFile = async (data) => {
  appendFile("jokes.txt", data, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}


//Getting popular joke from jokes.txt

const getPopularJoke = () => {
  readFile("jokes.txt", "utf-8", (err, data) => {
    if (err) { return }
    let jokesList = data.split("\n");
    let popularJoke = getMaxFromArray(jokesList);
    console.log({ popularJoke: popularJoke.item, Matchedcount: popularJoke.count });
  })
}

//with commandOption --leaderboard

let help = `
  Usage:\n
  node <file> <option>\n
  option:
  --search <text>\t text to be matched
  --leaderboard\t\t logs the popular joke object to the console.\n`

if (process.argv.length > 2) {

  let commandOption = process.argv[2].toLowerCase();

  switch (commandOption) {
    case "--leaderboard":
      getPopularJoke();
      break;
    case "--search":
      let queryText = process.argv[3];
      try {
        request.get(getOptions(queryText), reqCallback);
      } catch (e) {
        console.error("Connect to the network.");
      } finally {
        break;
      }

    case "--help":
      console.log(help);
      break;

    default:
      console.error("invalid option.")
      console.log(help)
  }

} else {
  console.log(help);
}


