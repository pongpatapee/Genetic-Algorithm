let mutationRate = 0.01;
let populationSize = 150;
let population = [];
let target = "this is the target phrase";

function setup() {
  createCanvas(640, 900);

  for (let i = 0; i < populationSize; i++) {
    population[i] = new DNA(target.length);
  }
}

function draw() {
  background(255);

  for (let phrase of population) {
    phrase.calcFintess(target);
  }

  fill(0);
  textFont("Courier");
  textSize(12);
  text(getAllPhrase(), width - 300, 30);

  let best = getBestPhrase();
  text(best.getPhrase(), 10, 30);

  // mating pool will help with
  // the probability distribution for
  // picking parents based on their fitness
  let matingPool = [];

  for (let phrase of population) {
    let n = floor(phrase.fitness * 100);
    for (let j = 0; j < n; j++) {
      matingPool.push(phrase);
    }
  }

  for (let i = 0; i < population.length; i++) {
    let parentA = random(matingPool);
    let parentB = random(matingPool);

    let child = parentA.crossOver(parentB);

    child.mutate(mutationRate);

    population[i] = child;
  }
}

function getBestPhrase() {
  let maxFitness = 0;
  let best = population[0];

  for (let phrase of population) {
    if (phrase.fitness > maxFitness) {
      maxFitness = phrase.fitness;
      best = phrase;
    }
  }
  return best;
}

function getAllPhrase() {
  let phrases = "";

  for (let i = 0; i < population.length; i++) {
    phrases += population[i].getPhrase();
    phrases += "\n";
  }

  return phrases;
}
