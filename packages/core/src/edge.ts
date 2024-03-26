import { Cell } from './cell'

export class Edge<C extends Cell> {
  constructor(source: C, target: C) {
    this.source = source
    this.target = target
  }

  source: C

  target: C
}
