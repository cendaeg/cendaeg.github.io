"use strict";

var Go = document.querySelector(".go");
var Release = document.querySelector(".release");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWords(data) {
  return data.json().then(function(words) {
    var wL = words.map(function(w) {return capitalize(w.word)}).filter(function(word) {
      var noun = document.querySelector(".endWord").value;
      return word.charAt(0) === noun.charAt(0).toUpperCase();
    });
    if(wL.length === 0) {
      return getAdjective();
    }
    return wL;
  });
} 

function selectRandom(words) {
  var randIndex = Math.floor(Math.random() * (words.length));
  return words[randIndex];
}

function getAdjective() {
  return fetch("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&sortBy=alpha&sortOrder=asc&limit=300&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(getWords).then(selectRandom);
}

Go.addEventListener('click', function() {
  getAdjective().then(function(adj) {
    var noun = document.querySelector(".endWord").value;
    Release.textContent = adj +" "+ noun;
  });
})
