<template>
  <div class='flex h-full w-full'>
    <div class='flex flex-col w-full'>
      <v-tabs
        v-model='tab'
        class=' flex-shrink-0'
      >
        <v-tab value='html'>
          html
        </v-tab>
        <v-tab value='svg'>
          svg
        </v-tab>
        <v-tab value='pixi'>
          pixi
        </v-tab>
      </v-tabs>
      <svg-org-chart
        v-if="tab==='svg'"
        ref='svgRef'
        @change='onTreeChange'
      />
      <pixi-org-chart v-else-if="tab==='pixi'" />
    </div>
    <v-divider
      vertical
    />
    <div class='w-300px flex-shrink-0 flex flex-col p-2'>
      <v-btn @click='exportImage'>
        导出图片
      </v-btn>
      <v-btn class='mt-2'>
        导出pdf
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SvgExporter } from '@interactiver/utils'

import PixiOrgChart from './PixiOrgChart.vue'
import SvgOrgChart from './SvgOrgChart.vue'

const tab = ref('svg')
const svgRef = shallowRef<InstanceType<typeof SvgOrgChart>>()
let treeElement: SVGGElement | undefined

function onTreeChange(value: SVGGElement) {
  treeElement = value
}

function getTreeSize(): { width: number, height: number, } {
  const { x = 0, y = 0, width = 0, height = 0 } = treeElement?.getBoundingClientRect() ?? {}
  return { width: x + width, height: y + height }
}

async function exportImage() {
  const { width, height } = getTreeSize()
  const svgEl = svgRef.value?.$el as SVGElement
  const exporter = new SvgExporter(svgEl)
  exporter.download('abc', { width, height: 10000 })
}

</script>
