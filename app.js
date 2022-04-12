//1. Create a simple command - line tool that allows us to send an API request and save the results in a text file!

//Your application should perform an API request to the dad joke API(https://icanhazdadjoke.com/api) to search for a joke based on the search phrase.

// GET: https://icanhazdadjoke.com/search?term=?

// If it discovers jokes that match the phrase, it should output a random joke and save it to a file named jokes.txt.If it fails to discover a joke, it should log a message to the console informing the user that no jokes for that search query were found.

//A command - line option called leaderboard should be accepted.Your application should return the most popular joke depending on how many times it appears in jokes.txt if that command - line input is passed in.

"use strict";

const request = require('request');
const { readFile, appendFile } = require('fs');

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
  let parsedBody = JSON.parse(body);
  if (parsedBody.results.length > 0) {
    console.log(parsedBody);
    saveToTxtFile(body);
  } else {
    console.log("Could not find your search text.")
  }
}

const saveToTxtFile = async (data) => {

  appendFile("jokes.txt", data, (err) => {
    if (err) {
      console.error(err)
      return
    } else {
      console.log("Saved to Jokes.txt")
    }
  })
}

if (process.argv.length > 2) {
  let commandOption = process.argv[2];
  if (commandOption == "--leaderboard") {
    readFile("jokes.txt", "utf-8", (err, data) => {
      if (err) { return }
      let jokesList = data.split("\n");
      //jokesList.forEach()
      console.log(jokesList);
    })
  }
}

request.get(getOptions("Hello"), reqCallback);


