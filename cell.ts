enum State {
  Alive, Dead
}

class Cell {
  neighbours: Array<Cell>;
  ruleset: Array<( currentState: State, neighbours: Array<Cell> ) => State>;
  currentState : State;
  nextState: State;

  constructor( ruleset: Array<( currentState: State, neighbours: Array<Cell> ) => State> ) {
    this.ruleset = ruleset;
    this.neighbours = [];
  }

  addNeightbour( neighbour: Cell ) {
    this.neighbours.push(neighbour);
    neighbour.neighbours.push(this);
  }

  advanceState() {
    this.currentState = this.nextState;
  }

  updateState() {
    this.ruleset.forEach(function( rule: ( currentState: State, neighbours: Array<Cell> ) => State ): void {
        this.nextState = rule(this.currentState, this.neighbours);
      })
  }
}
