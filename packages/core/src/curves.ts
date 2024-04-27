import * as d3 from 'd3'

import { Point } from './base'

/**
 * 通过4个点生成贝塞尔曲线
 * @param p0
 * @param p1
 * @param p2
 * @param p3
 */
export function generateCubicBezierPath(p0: Point, p1: Point, p2: Point, p3: Point): d3.Path {
  const path = d3.path()
  path.moveTo(p0.x, p0.y)
  path.bezierCurveTo(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y,
  )
  return path
}
