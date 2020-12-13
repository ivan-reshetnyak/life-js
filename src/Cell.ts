export enum State {
  Alive, Dead
}

export class Cell {
  neighbours: Array<Cell>;
  ruleset: Array<( cell: Cell ) => State>;
  currentState : State;
  nextState: State;

  constructor( state: State, ruleset: Array<( cell: Cell ) => State> ) {
    this.currentState = state;
    this.nextState = state;
    this.ruleset = ruleset;
    this.neighbours = [];
  }

  addNeightbour( neighbour: Cell ): void {
    this.neighbours.push(neighbour);
    neighbour.neighbours.push(this);
  }

  advanceState(): void {
    this.currentState = this.nextState;
  }

  isAlive() : boolean {
    return this.currentState == State.Alive;
  }

  updateState(): void {
    let self: Cell = this;

    this.ruleset.forEach(
      function( rule: ( cell: Cell ) => State ): void {
        self.nextState = rule(self);
      });
  }

  numOfAliveNeighbours(): number {
    let cnt: number = 0;
    this.neighbours.forEach(
      function(neightbour): void {
        if (neightbour.isAlive())
          ++cnt;
      });
    return cnt;
  }
}
