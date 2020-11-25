const n = parseInt(readline());
let cardp1 = [],
  cardp2 = [],
  manche = 0,
  tas1 = [],
  tas2 = [];

for (let i = 0; i < n; i++) {
  let card1 = readline();
  card1.split("").length === 3
    ? cardp1.push(card1[0] + card1[1])
    : cardp1.push(card1[0]);
}

const m = parseInt(readline());
for (let i = 0; i < m; i++) {
  let card2 = readline();
  card2.split("").length === 3
    ? cardp2.push(card2[0] + card2[1])
    : cardp2.push(card2[0]);
}

function letterToNum(arr) {
  arr.forEach(function (value, i) {
    if (value === "J") {
      arr[i] = 11;
    } else if (value === "Q") {
      arr[i] = 12;
    } else if (value === "K") {
      arr[i] = 13;
    } else if (value === "A") {
      arr[i] = 14;
    } else {
      arr[i] = parseInt(arr[i]);
    }
  });
}

letterToNum(cardp1);
letterToNum(cardp2);

while (true) {
  if (cardp1.length === 0) {
    console.log("2 " + manche);
    break;
  } else if (cardp2.length === 0) {
    console.log("1 " + manche);
    break;
  }
  if (cardp1[0] != cardp2[0]) {
    tas1.push(cardp1[0]);
    tas2.push(cardp2[0]);
    if (cardp1[0] > cardp2[0]) {
      cardp1 = cardp1.concat(tas1);
      cardp1 = cardp1.concat(tas2);
      cardp1 = [].concat.apply([], cardp1);
      tas1 = [];
      tas2 = [];
    } else {
      cardp2 = cardp2.concat(tas1);
      cardp2 = cardp2.concat(tas2);
      cardp2 = [].concat.apply([], cardp2);
      tas1 = [];
      tas2 = [];
    }
    cardp1.shift();
    cardp2.shift();
    manche++;
  } else {
    if (cardp1.length <= 3 || cardp2.length <= 3) {
      console.log("PAT");
      break;
    } else {
      tas1.push(cardp1.slice(0, 4));
      tas2.push(cardp2.slice(0, 4));
      cardp1.splice(0, 4);
      cardp2.splice(0, 4);
    }
  }
}
