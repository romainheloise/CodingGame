const N = parseInt(readline());
var inputs = readline().split(" ");
let supZero = 0;
let arrayTemp = [];
let search = true;

while (search) {
  inputs.map(function (value, i) {
    if (value != 0) {
      inputs[i] = value - 1;
      supZero++;
    }
  });
  inputs.push(supZero);
  supZero = 0;

  for (let index = 0; index < arrayTemp.length; index++) {
    if (
      inputs
        .filter((x) => x != 0)
        .sort()
        .join("") === arrayTemp[index].join("")
    ) {
      search = false;
      console.log(arrayTemp.length - index);
      break;
    }
  }
  arrayTemp.push(inputs.filter((x) => x != 0).sort());

  if (arrayTemp.length > 100) {
    arrayTemp = [];
  }
}
