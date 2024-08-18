export class Game {
  #settings = {
    gridSize: {
      columns: 4,
      rows: 4,
    }
  };
  #status = 'pending';
  #player1;
  #player2;
  #google;

  #getRandomPosition(existedPosition = []) {
    let newX;
    let newY;

    do {
      newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns);
      newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows)
    } while (
      existedPosition.some(pos => newX === pos.x && newY === pos.y)
      )

    return new Position(newX, newY)
  }

  #createUnits() {
    const player1Position = this.#getRandomPosition();
    this.#player1 = new Player(1, player1Position);

    const player2Position = this.#getRandomPosition([player1Position]);
    this.#player2 = new Player(1, player2Position);

    const googlePosition = this.#getRandomPosition([player1Position, player2Position]);
    this.#google = new Google(googlePosition);
  }

  async start() {
    if (this.#status === 'pending') {
      this.#status = 'in-process';
      this.#createUnits();
    }
  }
  get status() {
    return this.#status
  }
  set settings(settings) {
    this.#settings = settings
  }

  get settings() {
    return this.#settings
  }

  get player1() {
    return this.#player1
  }

  get player2() {
    return this.#player2
  }
  get google() {
    return this.#google
  }
}

class Unit {
  constructor(position) {
    this.position = position;
  }
}

class Player extends Unit {
  constructor(id, position) {
    super(position)
    this.id = id;
  }
}

class Google extends Unit {
  constructor(position) {
    super(position);
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class NumberUtil {
  /**
   * @param {*} max
   * @returns вернет рандомное число от 1 до max
   */
  static getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1)
  }
}

module.exports = {
  Game,
}