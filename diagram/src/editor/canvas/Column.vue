<template>
  <div
    class='w-full h-32px bg-green-300 flex items-center'
    @pointerenter='onPointerenter'
  >
    <div
      class='bg-blue w-12px h-12px rounded-6px'
      @pointerdown.stop='dragHandler'
    />
  </div>
</template>

<script setup lang="ts">
import { CanvasProviderKey } from './provider'
import { createDragHandler } from './utils'
import { Edge, Point, Node } from '../../core'

const providerValue = inject(CanvasProviderKey)
if (!providerValue) {
  throw Error('Must be used with CanvasProvider')
}

const { edges, setCurrentEdge, getEventGlobalPosition, getGlobalPosition } = providerValue

const relations = new Map<string, Edge<Node>>()
const node = new Node()

function onPointerenter() {

}

function dragHandler(event: PointerEvent) {
  const edge = new Edge({ source: node, target: new Node() })
  createDragHandler({
    start(event) {
      const div = event.target as HTMLDivElement
      const { x, y } = div.getBoundingClientRect()
      edge.source.position.set(getGlobalPosition(new Point({ x, y })))
      relations.set(edge.id, edge)
    },
    move(event) {
      edge.target.position.set(getEventGlobalPosition(event))
      setCurrentEdge(edge)
    },
    end() {
      setCurrentEdge()
    },
  })(event)
}

</script>
