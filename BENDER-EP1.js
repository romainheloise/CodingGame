var inputs = readline().split(" ");
const L = inputs[0];
const C = inputs[1];
let jump = [];
let stack = 0;
let game = {
  bender: {
    position: [0, 0],
    beer: false,
    inverse: false,
    inverseContact: false,
    direction: function () {
      if (game.bender.inverse === true && game.bender.inverseContact === true) {
        return ["West", "North", "East", "South"];
      } else {
        return ["South", "East", "North", "West"];
      }
    },
    directionIndex: 0,
  },

  case: {
    space: [],
    X: [],
    mur: [],
    modifier: {
      S: [],
      E: [],
      W: [],
      N: [],
    },
    B: [],
    I: [],
    T: [],
  },

  move: function () {
    stack++;
    if (game.bender.inverse === true && game.bender.inverseContact === true) {
      switch (game.bender.directionIndex) {
        case 3:
          game.bender.position[1] += 1;
          jump.push("SOUTH");
          break;
        case 2:
          game.bender.position[0] += 1;
          jump.push("EAST");
          break;
        case 1:
          game.bender.position[1] -= 1;
          jump.push("NORTH");
          break;
        case 0:
          game.bender.position[0] -= 1;
          jump.push("WEST");
          break;
      }
    } else {
      switch (game.bender.directionIndex) {
        case 0:
          game.bender.position[1] += 1;
          jump.push("SOUTH");
          break;
        case 1:
          game.bender.position[0] += 1;
          jump.push("EAST");
          break;
        case 2:
          game.bender.position[1] -= 1;
          jump.push("NORTH");
          break;
        case 3:
          game.bender.position[0] -= 1;
          jump.push("WEST");
          break;
      }
    }
  },

  check: function (object, x, y, style) {
    let result = false;
    let endroit = 0;
    for (let index = 0; index < object.length; index++) {
      if (object[index][0] === x && object[index][1] === y) {
        result = true;
        endroit = index;
        break;
      }
    }
    if (style === "nextP") {
      return endroit;
    } else {
      return result;
    }
  },

  actualPosition: function (object) {
    return game.check(object, game.bender.position[0], game.bender.position[1]);
  },

  nextMovement: {
    South: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x, y + 1);
      return result;
    },
    East: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x + 1, y);
      return result;
    },
    North: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x, y - 1);
      return result;
    },
    West: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x - 1, y);
      return result;
    },
  },

  nextPos: {
    South: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x, y + 1, "nextP");
      return result;
    },
    East: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x + 1, y, "nextP");
      return result;
    },
    North: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x, y - 1, "nextP");
      return result;
    },
    West: function (object) {
      let x = game.bender.position[0];
      let y = game.bender.position[1];
      let result = game.check(object, x - 1, y, "nextP");
      return result;
    },
  },

  nextMove: function (object) {
    return game.nextMovement[
      game.bender.direction()[game.bender.directionIndex]
    ](object);
  },

  nextPo: function (object) {
    return game.nextPos[game.bender.direction()[game.bender.directionIndex]](
      object
    );
  },

  loose: function () {
    let final = true;
    if (
      game.bender.position[0] === exit[0] &&
      game.bender.position[1] === exit[1]
    ) {
      final = false;
    }
    return final;
  },
};
(exit = [0, 0]), (row = []);

for (let i = 0; i < L; i++) {
  row.push(readline().split(""));
}

for (let y = 0; y < L; y++) {
  for (let x = 0; x < C; x++) {
    if (row[y][x] === "@") {
      game.bender.position[0] = x;
      game.bender.position[1] = y;
    } else if (row[y][x] === "$") {
      exit[0] = x;
      exit[1] = y;
    } else if (row[y][x] === "X") {
      game.case.X.push([x, y]);
    } else if (row[y][x] === " ") {
      game.case.space.push([x, y]);
    } else if (row[y][x] === "#") {
      game.case.mur.push([x, y]);
    } else if (row[y][x] === "S") {
      game.case.modifier.S.push([x, y]);
    } else if (row[y][x] === "E") {
      game.case.modifier.E.push([x, y]);
    } else if (row[y][x] === "N") {
      game.case.modifier.N.push([x, y]);
    } else if (row[y][x] === "W") {
      game.case.modifier.W.push([x, y]);
    } else if (row[y][x] === "B") {
      game.case.B.push([x, y]);
    } else if (row[y][x] === "I") {
      game.case.I.push([x, y]);
    } else if (row[y][x] === "T") {
      game.case.T.push([x, y]);
    }
  }
}

let loopPos = [];
(loopDir = []), (loopBeer = []);
(loopInverse = []), (loopC = []);
let end = false;

while (game.loose()) {
  if (end === true) {
    break;
  }

  if (game.actualPosition(game.case.space)) {
    if (game.actualPosition(loopPos) && stack > 200) {
      for (let i = 0; i < loopPos.length; i++) {
        if (
          loopPos[i][0] === game.bender.position[0] &&
          loopPos[i][1] === game.bender.position[1] &&
          loopDir[i] === game.bender.direction()[game.bender.directionIndex] &&
          loopBeer[i] === game.bender.beer &&
          loopC[i] === game.bender.inverseContact &&
          loopInverse[i] === game.bender.inverse
        ) {
          end = true;
        }
      }
    } else {
      loopPos.push(game.bender.position.slice(0));
      loopDir.push(game.bender.direction()[game.bender.directionIndex]);
      loopBeer.push(game.bender.beer);
      loopC.push(game.bender.inverseContact);
      loopInverse.push(game.bender.inverse);
    }
  }

  if (game.actualPosition(game.case.B)) {
    game.bender.beer === false
      ? (game.bender.beer = true)
      : (game.bender.beer = false);
  } else if (game.actualPosition(game.case.modifier.S)) {
    game.bender.directionIndex = 0;
    game.bender.inverseContact = false;
  } else if (game.actualPosition(game.case.modifier.E)) {
    game.bender.directionIndex = 1;
    game.bender.inverseContact = false;
  } else if (game.actualPosition(game.case.modifier.N)) {
    game.bender.directionIndex = 2;
    game.bender.inverseContact = false;
  } else if (game.actualPosition(game.case.modifier.W)) {
    game.bender.directionIndex = 3;
    game.bender.inverseContact = false;
  } else if (game.actualPosition(game.case.I)) {
    game.bender.inverse === false
      ? (game.bender.inverse = true)
      : (game.bender.inverse = false);
    if (game.bender.inverseContact === true) {
      game.bender.inverseContact = false;

      switch (game.bender.directionIndex) {
        case 0:
          game.bender.directionIndex = 3;
          break;
        case 1:
          game.bender.directionIndex = 2;
          break;
        case 2:
          game.bender.directionIndex = 1;
          break;
        case 3:
          game.bender.directionIndex = 0;
          break;
      }
    }
  } else if (game.actualPosition(game.case.T)) {
    if (
      game.case.T.map((x) => x.join("")).indexOf(
        game.bender.position.join("")
      ) === 0
    ) {
      game.bender.position[0] = game.case.T[1][0];
      game.bender.position[1] = game.case.T[1][1];
    } else if (
      game.case.T.map((x) => x.join("")).indexOf(
        game.bender.position.join("")
      ) === 1
    ) {
      game.bender.position[0] = game.case.T[0][0];
      game.bender.position[1] = game.case.T[0][1];
    }
  }

  if (game.nextMove(game.case.mur)) {
    if (game.bender.inverse === true) {
      game.bender.inverseContact = true;
    }
    game.bender.directionIndex = 0;
    while (game.nextMove(game.case.mur) || game.nextMove(game.case.X)) {
      game.bender.directionIndex += 1;
    }
  } else if (game.nextMove(game.case.X) && game.bender.beer === false) {
    if (game.bender.inverse === true) {
      game.bender.inverseContact = true;
    }
    game.bender.directionIndex = 0;
    while (game.nextMove(game.case.mur) || game.nextMove(game.case.X)) {
      game.bender.directionIndex += 1;
    }
  } else if (game.nextMove(game.case.X) && game.bender.beer === true) {
    game.case.X.splice(game.nextPo(game.case.X), 1);
  }

  game.move();
}

if (end === false) {
  for (let i = 0; i < jump.length; i++) {
    console.log(jump[i]);
  }
} else {
  console.log("LOOP");
}
