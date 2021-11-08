import { argv } from "process";

const allowedAwes = ["Sunset", "Watarfall", "Thunder", "Lightening"];

const magicInArray = (arg) =>
  new Proxy(arg, {
    has: (target, key) => target.includes(key),
  });

const aweLang = (typesOfAwe, whoFor) => {
  const chosenAwe = typesOfAwe[0].trim();
  if (chosenAwe in magicInArray(allowedAwes)) {
    console.log(`Creating a ${chosenAwe} for ${whoFor}`);
  } else {
    console.error("Couldn't parse your weird language bro!");
  }
};

aweLang`Waterfall ${argv[2]}`;

// You should run this file with `node ./broken/awe-lang.js MyNameHere`
