import { Formation } from "./Formation";
import { State } from "./Cell";
import { FormationOcta } from "./formations/FormationOcta";

let formation: Formation = new FormationOcta(10, 10);
formation.randomize();

/*
let formation: FormationOcta = new FormationOcta(4, 5);
formation.set(1, -1, State.Alive);
formation.set(1, 0, State.Alive);
formation.set(1, 1, State.Alive);
*/

setInterval(
  function(): void {
    console.log(formation.render());
    formation.update();
  }, 500);
