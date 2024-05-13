import * as d3 from 'd3'

import { Cell, CellOptions } from './cell'
import { Node } from './node'
import { Point } from './point'
export interface EdgeOptions<T extends Node> extends CellOptions {
  source: T,
  target: T,
}

export class Edge<T extends Node> extends Cell {
  constructor(options: EdgeOptions<T>) {
    super(options)
    this.source = options.source
    this.target = options.target
  }

  source: T

  target: T

  path(vertices: Point[] = []): d3.Path {
    const path = d3.path()
    path.moveTo(this.source.x, this.source.y)
    for (const vertex of vertices) {
      path.lineTo(vertex.x, vertex.y)
    }
    path.lineTo(this.target.x, this.target.y)
    return path
  }
}
