const N = parseInt(readline());
let score = {};
let mots = [];
for (let i = 0; i < N; i++) {
  const W = readline();
  score[W] = 0;
  W.split("").map(function (value) {
    if (/[eaionrtlsu]/.test(value)) {
      score[W] += 1;
    } else if (/[dg]/.test(value)) {
      score[W] += 2;
    } else if (/[bcmp]/.test(value)) {
      score[W] += 3;
    } else if (/[fhvwy]/.test(value)) {
      score[W] += 4;
    } else if (/[k]/.test(value)) {
      score[W] += 5;
    } else if (/[jx]/.test(value)) {
      score[W] += 8;
    } else if (/[qz]/.test(value)) {
      score[W] += 10;
    }
  });
  mots.push(W);
}

const LETTERS = readline();
let lettres = LETTERS.split("");
let validWords = [];

for (let index = 0; index < mots.length; index++) {
  let validtemp = [];
  mots[index].split("").map(function (le, i) {
    if (lettres.indexOf(le) != -1) {
      validtemp.push(le);
      lettres.splice(lettres.indexOf(le), 1);
    }
  });
  if (validtemp.length === mots[index].split("").length) {
    validWords.push(mots[index]);
  }
  lettres = LETTERS.split("");
  validtemp = [];
}

let res = 0;
let final = "";
for (let v = 0; v < validWords.length; v++) {
  if (score[validWords[v]] > res) {
    res = score[validWords[v]];
    final = validWords[v];
  }
}

console.log(final);
