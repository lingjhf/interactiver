import Hammer from 'hammerjs'

import { createElement } from './utils'

export class InteractiveView {
  constructor(element: HTMLElement) {
    this.element = createElement('svg')
    element.appendChild(this.element)
    this.element.style.width = '100%'
    this.element.style.height = '100%'
    this._hm = new Hammer(this.element)
    const canEnable = (recognizer: Recognizer, inputData: HammerInput) => {
      console.log('Ok', recognizer)
      return true
    }
    this._hm.add(new Hammer.Pan({ enable: canEnable }))
  }

  readonly element: SVGSVGElement

  private _hm: HammerManager
}
