import { Cell, Edge, Point, generateCubicBezierPath } from '@interactiver/core'
import * as d3 from 'd3'

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
