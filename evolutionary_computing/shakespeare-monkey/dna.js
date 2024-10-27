function randomCharacter() {
  // Ascii numbers for characters
  let c = floor(random(32, 127));
  return String.fromCharCode(c);
}

class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < length; i++) {
      this.genes[i] = randomCharacter();
    }
  }

  getPhrase() {
    return this.genes.join("");
  }

  // calculates percentage of correct characters
  calcFintess(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;
      }
    }

    this.fitness = score / target.length;
  }

  crossOverMidPointStrategy(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i < midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  crossOverCoinFlip(partner) {
    let child = new DNA(this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if (random() < 0.5) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  crossOver(partner) {
    return this.crossOverMidPointStrategy(partner);
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random() < mutationRate) {
        this.genes[i] = randomCharacter();
      }
    }
  }
}
