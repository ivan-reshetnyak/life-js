export enum State {
  Alive, Dead
}

export class Cell {
  neighbours: Array<Cell>;
  ruleset: Array<( currentState: State, neighbours: Array<Cell> ) => State>;
  currentState : State;
  nextState: State;

  constructor( state: State, ruleset: Array<( currentState: State, neighbours: Array<Cell> ) => State> ) {
    this.currentState = state;
    this.nextState = state;
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
    let me: Cell = this;

    this.ruleset.forEach(
      function( rule: ( currentState: State, neighbours: Array<Cell> ) => State ): void {
        me.nextState = rule(me.currentState, me.neighbours);
      })
  }
}
