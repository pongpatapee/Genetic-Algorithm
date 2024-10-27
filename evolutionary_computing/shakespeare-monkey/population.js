class Population {
  constructor(target, mutationRate, populationSize) {
    this.population = [];
    this.target = target;
    this.mutationRate = mutationRate;
    this.populationSize = populationSize;

    this.best = null;
    this.isFinished = false;
    this.generation = 0;

    for (let i = 0; i < populationSize; i++) {
      this.population[i] = new DNA(target.length);
    }

    this.matingPool = [];
  }

  calcFitness() {
    for (let phrase of this.population) {
      phrase.calcFintess(this.target);
    }
  }

  naturalSelection() {
    // mating pool will help with
    // the probability distribution for
    // picking parents based on their fitness
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    //add to the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // arbritrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generateNextGen() {
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let parentA = this.matingPool[a];
      let parentB = this.matingPool[b];

      let child = parentA.crossOver(parentB);
      child.mutate(this.mutationRate);

      this.population[i] = child;
    }

    this.generation++;
  }

  evaluate() {
    let maxFitness = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
        index = i;
      }
    }

    this.best = this.population[index];
    if (maxFitness === 1) {
      this.finished = true;
    }
  }

  getStats() {
    let avgFitness = 0;

    for (let i = 0; i < this.population.length; i++) {
      avgFitness += this.population[i].fitness;
    }
    avgFitness = avgFitness / this.population.length;

    let stats = "";
    stats += `total generations: ${this.generation}\n`;
    stats += `best fitness: ${this.best.fitness}\n`;
    stats += `avg fitness: ${avgFitness}\n`;
    stats += `total population: ${this.populationSize}\n`;
    stats += `mutation rate: ${floor(this.mutationRate * 100)}%\n`;

    return stats;
  }

  getPhrases(limit) {
    let num = min(limit, this.population.length);

    let phrases = "";
    for (let i = 0; i < num; i++) {
      phrases += this.population[i].getPhrase();
      phrases += "\n";
    }

    return phrases;
  }
}
