const boots = Symbol("Heavy boot");
const sneakers = Symbol("Sneakers");
const runningShoes = Symbol("Running shoes");

let shoes = [sneakers, boots];

try {
  shoes.push(runningShoes);
} catch {
  shoes = [runningShoes, ...shoes];
}

const activeShoe = shoes[shoes.length - 1];

const rain = (shoe) => {
  if (shoe === boots) {
    console.log("Rain is fun! :)");
  } else {
    console.error("Ohh no! We can't cope with the rain");
  }
};

rain(activeShoe);
// Let's try to make it through the rain... with immutability
// Run with `node ./broken/mutated.js`
