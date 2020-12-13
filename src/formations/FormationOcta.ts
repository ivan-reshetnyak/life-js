import { Formation } from "../Formation";
import { Cell, State } from "../Cell";

export class FormationOcta extends Formation {
  sizeX: number;
  sizeY: number;
  cells: Array<Cell>;

  constructor( sizeX: number, sizeY: number ) {
    super();
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    let self = this;

    // Set ruleset
    let ruleset: Array<( cell: Cell ) => State> = [
        function( cell: Cell ): State {
          if (cell.isAlive() && cell.numOfAliveNeighbours() < 2)
            return State.Dead;
          return cell.nextState;
        },
        function( cell: Cell ): State {
          if (cell.isAlive() && cell.numOfAliveNeighbours() > 3)
            return State.Dead;
          return cell.nextState;
        },
        function( cell: Cell ): State {
          if (!cell.isAlive() && cell.numOfAliveNeighbours() == 3)
            return State.Alive;
          return cell.nextState;
        }
      ];

    // Initialize cell array
    this.cells = new Array<Cell>(0);
    for (let i = 0; i < sizeX * sizeY; ++i)
      this.cells.push(new Cell(State.Dead, ruleset));

    // Link neighbours
    let deltas: Array<Array<number>> = [
      [-1, -1], [ 0, -1], [ 1, -1],
      [-1,  0]];
    for (let y = 0; y < sizeY; ++y)
      for (let x = 0; x < sizeX; ++x) {
        deltas.forEach(
          function( delta ): void {
            self.lookup(x, y).addNeightbour(self.lookup(x + delta[0], y + delta[1]));
          });
        }
  }

  lookup( x: number, y: number ): Cell {
    x = ((x % this.sizeX) + this.sizeX) % this.sizeX;
    y = ((y % this.sizeY) + this.sizeY) % this.sizeY;
    return this.cells[y * this.sizeX + x];
  }

  set( x: number, y: number, state: State ): void {
    this.lookup(x, y).currentState = state;
    this.lookup(x, y).nextState = state;
  }

  render(): string {
    let result: string = "";
    for (let y = 0; y < this.sizeY; ++y) {
      //result += "<p>"
      for (let x = 0; x < this.sizeX; ++x)
        if (this.lookup(x, y).isAlive())
          result += "1";
        else
          result += "0";
      //result += "</p>"
      result += "\n"
    }
    return result;
  }

  update(): void {
    this.cells.forEach(
      function( cell ): void {
        cell.updateState();
      });
    this.cells.forEach(
      function( cell ): void {
        cell.advanceState();
      });
  }

  randomize(): void {
    this.cells.forEach(
      function( cell ): void {
        let rnd: number = Math.random();
        if (rnd < 0.5)
          cell.currentState = State.Alive;
        else
          cell.currentState = State.Dead;
      }
    )
  }
}
