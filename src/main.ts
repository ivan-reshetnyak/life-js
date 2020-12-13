import { FormationOcta } from "./formations/FormationOcta";

let formation: FormationOcta = new FormationOcta(0, 0);

let parsed: boolean = false;

if (process.argv[2] == "random") {
  let sizeX = parseInt(process.argv[3]);
  let sizeY = parseInt(process.argv[3]);
  formation.resize(sizeX, sizeY);
  formation.randomize();
  parsed = true;
} else if (process.argv[2] == "file") {
  formation.read(process.argv[3]);
  parsed = true;
}

if (parsed)
  setInterval(
    function(): void {
      console.log(formation.render());
      formation.update();
    }, 1000);
else
  console.log("Incorrect usage: expected 'npm start random <sizeX> <sizeY>' or 'npm start file <filename>'!");
