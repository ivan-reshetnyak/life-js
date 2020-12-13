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
    this.cells = new Array<Cell>(0);
    let self = this;

    let ruleset: Array<( cell: Cell ) => State> = [
        function( cell: Cell ): State {
          if (cell.isAlive() && cell.numOfAliveNeighbours() < 2)
            return State.Dead;
            return State.Alive;
        },
        function( cell: Cell ): State {
          if (cell.isAlive() && cell.numOfAliveNeighbours() > 3)
            return State.Dead;
          return State.Alive;
        },
        function( cell: Cell ): State {
          if (!cell.isAlive() && cell.numOfAliveNeighbours() == 3)
            return State.Alive;
          return State.Dead;
        }
      ];

    let deltas: Array<Array<number>> = [[-1, -1], [ 0, -1], [1, -1], [-1,  0]];
    for (let y = 0; y < sizeY; ++y)
      for (let x = 0; x < sizeX; ++x) {
        this.cells.push(new Cell(State.Dead, ruleset));
        deltas.forEach(
          function( delta ): void {
            if (self.exists(x + delta[0], y + delta[1]))
              self.lookup(x, y).addNeightbour(self.lookup(x + delta[0], y + delta[1]));
          });
        }
  }

  exists( X: number, Y: number ): boolean {
    return 0 <= X && this.sizeX > X && 0 <= Y && this.sizeY > Y;
  }

  lookup( X: number, Y: number ): Cell {
    return this.cells[Y * this.sizeX + X];
  }

  render(): string {
    let result: string = "";
    for (let y = 0; y < this.sizeY; ++y) {
      result += "<p>"
      for (let x = 0; x < this.sizeX; ++x)
        if (this.lookup(x, y).isAlive())
          result += "1";
        else
          result += "0";
      result += "</p>"
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
}
