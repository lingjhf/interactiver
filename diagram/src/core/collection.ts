import { EventEmitter } from 'eventemitter3'

import { Cell } from './cell'

export class Collection extends EventEmitter<{ added: { cell: Cell, index: number, }, removed: { cell: Cell, index: number, }, }> {
  private _length = 0
  private _cells: Cell[] = []
  private _map: Map<string, Cell> = new Map()

  add(cells: Cell[], index?: number): this {
    let insertIndex = index ?? this._length
    if (insertIndex > this._length) {
      insertIndex = this._length
    }
    if (insertIndex < 0) {
      insertIndex += this._length + 1
    }
    const added: Cell[] = []
    for (const cell of cells) {
      if (!this.get(cell)) {
        added.push(cell)
        this.setRef(cell)
      }
    }
    if (added.length) {
      this._cells.splice(insertIndex, 0, ...added)
      this._length = this._cells.length
    }
    for (const [index, cell] of added.entries()) {
      this.emit('added', { cell, index: insertIndex + index })
    }
    return this
  }

  remove(...cells: Cell[]): this {
    for (let i = 0; i < cells.length; i++) {
      const cell = this.get(cells[i])
      if (!cell) {
        continue
      }
      const index = this._cells.indexOf(cell)
      this._cells.splice(index, 1)
      this._length -= 1
      this.deleteRef(cell)
      // cell.remove()
      this.emit('removed', { cell, index })
    }
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
