import { EventEmitter } from 'eventemitter3'

import { Cell } from './cell'

export class Collection extends EventEmitter {
  private _length = 0
  private _cells: Cell[] = []
  private _map: Map<string, Cell> = new Map()

  add(cells: Cell[]): this {
    for (const cell of cells) {
      if (!this.get(cell)) {
        this.setRef(cell)
      }
    }
    return this
  }

  remove(cells: Cell[]): this {
    return this
  }

  reset(cells: Cell[]): this {
    return this
  }

  get(cell: string | Cell): Cell | undefined {
    const id = typeof cell === 'string' ? cell : cell.id
    return this._map.get(id)
  }

  has(cell: string | Cell): boolean {
    const id = typeof cell === 'string' ? cell : cell.id
    return this._map.has(id)
  }

  at(index: number): Cell | undefined {
    if (index < 0) {
      index += this._length
    }
    return this._cells[index]
  }

  first() {
    return this.at(0)
  }

  last() {
    return this.at(-1)
  }

  indexOf(cell: Cell) {
    return this._cells.indexOf(cell)
  }

  toList() {
    return this._cells.slice()
  }

  clean() {
    this._length = 0
    this._cells = []
    this._map.clear()
  }

  protected setRef(cell: Cell) {
    this._map.set(cell.id, cell)
  }

  protected deleteRef(cell: Cell) {
    this._map.delete(cell.id)
  }
}
