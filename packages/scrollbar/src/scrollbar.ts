import { Thumb } from './thumb'

export interface ScrollbarOptions {
  viewWidth: number,
  viewHeight: number,
  contentWidth: number,
  contentHeight: number,
  thumbMinWidth: number,
  thumbMinHeight: number,
}

export class Scrollbar {
  constructor(options?: Partial<ScrollbarOptions>) {
    this._horizontalThumb = new Thumb({
      viewWidth: options?.viewWidth,
      contentWidth: options?.contentWidth,
      minWidth: options?.thumbMinWidth,
    })
    this._verticalThumb = new Thumb({
      viewWidth: options?.viewHeight,
      contentWidth: options?.contentHeight,
      minWidth: options?.thumbMinHeight,
    })
  }

  private _verticalThumb: Thumb

  private _horizontalThumb: Thumb

  get horizontalScrollX(): number {
    return this._horizontalThumb.scrollX
  }

  get verticalScrollY(): number {
    return this._verticalThumb.scrollX
  }

  get horizontalThumbX(): number {
    return this._horizontalThumb.thumbX
  }

  get verticalThumbY(): number {
    return this._verticalThumb.thumbX
  }

  get horizontalThumbWidth(): number {
    return this._horizontalThumb.thumbWidth
  }

  get verticalThumbHeight(): number {
    return this._verticalThumb.thumbWidth
  }

  get viewWidth(): number {
    return this._horizontalThumb.viewWidth
  }

  get viewHeight(): number {
    return this._verticalThumb.viewWidth
  }

  get contentWidth(): number {
    return this._horizontalThumb.contentWidth
  }

  get contentHeight(): number {
    return this._verticalThumb.contentWidth
  }

  setViewWidth(value: number): this {
    this._horizontalThumb.setViewWidth(value)
    return this
  }

  setViewHeight(value: number): this {
    this._verticalThumb.setViewWidth(value)
    return this
  }

  setContentWidth(value: number): this {
    this._horizontalThumb.setContentWidth(value)
    return this
  }

  setContentHeight(value: number): this {
    this._verticalThumb.setContentWidth(value)
    return this
  }

  scrollTo(options: { x?: number, y?: number, }): this {
    if (options.x !== undefined) {
      this._horizontalThumb.scrollTo(options.x)
    }
    if (options.y !== undefined) {
      this._verticalThumb.scrollTo(options.y)
    }
    return this
  }

  thumbTo(options: { x?: number, y?: number, }): this {
    if (options.x !== undefined) {
      this._horizontalThumb.thumbTo(options.x)
    }
    if (options.y !== undefined) {
      this._verticalThumb.thumbTo(options.y)
    }
    return this
  }
}
