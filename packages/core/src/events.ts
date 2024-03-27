import mitt, { Emitter, EventHandlerMap, EventType, Handler, WildcardHandler } from 'mitt'

export type MittEvents = Record<EventType, unknown>

export class Mitt<Events extends MittEvents> implements Emitter<Events> {
  private _emitter = mitt<Events>()

  get all(): EventHandlerMap<Events> {
    return this._emitter.all
  }

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
  on(type: '*', handler: WildcardHandler<Events>): void
  on<Key extends keyof Events>(type: unknown, handler: unknown): void {
    if (type === '*') {
      this._emitter.on(type, handler as WildcardHandler<Events>)
    }
    else {
      this._emitter.on(type as Key, handler as Handler<Events[Key]>)
    }
  }

  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]> | undefined): void
  off(type: '*', handler: WildcardHandler<Events>): void
  off<Key extends keyof Events>(type: unknown, handler?: unknown): void {
    if (type === '*') {
      this._emitter.off(type, handler as WildcardHandler<Events>)
    }
    else {
      this._emitter.off(type as Key, handler as Handler<Events[Key]>)
    }
  }

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
  emit<Key extends keyof Events>(type: unknown, event?: unknown): void {
    if (event) {
      this._emitter.emit(type as Key, event as Events[Key])
    }
    else {
      this._emitter.emit(type as (undefined extends Events[Key] ? Key : never))
    }
  }
}
