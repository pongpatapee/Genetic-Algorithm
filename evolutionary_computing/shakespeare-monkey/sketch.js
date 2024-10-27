let mutationRate = 0.01;
let populationSize = 150;
let target = "to be or not to be.";
let population;

let bestPhraseDiv = document.getElementById("best");
let statsDiv = document.getElementById("stats");
let allPhrasesDiv = document.getElementById("all-phrases");

function setup() {
  population = new Population(target, mutationRate, populationSize);
}

function draw() {
  population.calcFitness();
  population.evaluate();

  // display text
  bestPhraseDiv.innerText = population.best.getPhrase();
  statsDiv.innerText = population.getStats();
  allPhrasesDiv.innerText = population.getPhrases(100);

  if (population.best.getPhrase() === target) {
    noLoop();
  }

  population.naturalSelection();
  population.generateNextGen();
}
