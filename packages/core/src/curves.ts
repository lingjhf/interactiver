import * as d3 from 'd3'

import { Cell } from './cell'
import { Edge } from './edge'
import { Point } from './point'

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

/**
 * 获取左到右方向的曲线
 * @param edge
 * @returns
 */
export function generateLRCurve(edge: Edge<Cell>): d3.Path {
  const source = new Point({ x: edge.source.x + edge.source.width, y: edge.source.y + edge.source.height / 2 })
  const target = new Point({ x: edge.target.x, y: edge.target.y + edge.target.height / 2 })
  const centerPoint = source.centerOf(target)
  return generateCubicBezierPath(
    source,
    new Point({ x: centerPoint.x, y: source.y }),
    new Point({ x: centerPoint.x, y: target.y }),
    target,
  )
}

/**
 * 获取右到左方向的曲线
 * @param edge
 * @returns
 */
export function generateRLCurve(edge: Edge<Cell>): d3.Path {
  const source = new Point({ x: edge.source.x, y: edge.source.y + edge.source.height / 2 })
  const target = new Point({ x: edge.target.x + edge.target.width, y: edge.target.y + edge.target.height / 2 })
  const centerPoint = source.centerOf(target)
  return generateCubicBezierPath(
    source,
    new Point({ x: centerPoint.x, y: source.y }),
    new Point({ x: centerPoint.x, y: target.y }),
    target,
  )
}

/**
 * 获取上到下方向的曲线
 * @param edge
 * @returns
 */
export function generateTBCurve(edge: Edge<Cell>): d3.Path {
  const source = new Point({ x: edge.source.x + edge.source.width / 2, y: edge.source.y + edge.source.height })
  const target = new Point({ x: edge.target.x + edge.target.width / 2, y: edge.target.y })
  const centerPoint = source.centerOf(target)
  return generateCubicBezierPath(
    source,
    new Point({ x: source.x, y: centerPoint.y }),
    new Point({ x: target.x, y: centerPoint.y }),
    target,
  )
}

/**
 * 获取下到上方向的曲线
 * @param edge
 * @returns
 */
export function generateBTCurve(edge: Edge<Cell>): d3.Path {
  const source = new Point({ x: edge.source.x + edge.source.width / 2, y: edge.source.y })
  const target = new Point({ x: edge.target.x + edge.target.width / 2, y: edge.target.y + edge.target.height })
  const centerPoint = source.centerOf(target)
  return generateCubicBezierPath(
    source,
    new Point({ x: source.x, y: centerPoint.y }),
    new Point({ x: target.x, y: centerPoint.y }),
    target,
  )
}
