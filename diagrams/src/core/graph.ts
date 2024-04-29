import { Node } from './node'

export interface GraphOptions {

  // 画布的容器。
  container: HTMLElement,

  // 画布宽度，默认使用容器宽度。
  width?: number,

  // 画布高度，默认使用容器高度。
  height?: number,

  // 是否监听容器大小改变，并自动更新画布大小。 default: false
  resizeTo?: boolean | Element | Document,

  // 画布是否可以拖拽平移，默认禁用。
  panning?: boolean,

  // 网格，默认使用 10px 的网格，但不绘制网格背景。
  grid?: boolean | number,

  // 背景，默认不绘制背景
  background?: boolean,

  // 是否只渲染可视区域内容
  virtual?: boolean,

}

export class Graph {
  constructor(options: GraphOptions) {

  }

  /**
   * 设置画布大小。
   *
   * @param width 画布宽度，缺省时宽度保持不变。
   * @param height 画布高度，缺省时高度保持不变。
   * @returns
   */
  resize(width?: number, height?: number): this {
    return this
  }

  addNode(node: Node): this {
    return this
  }

  addNodes(nodes: Node[]): this {
    return this
  }
}
