<template>
  <div class='flex flex-col h-full w-full'>
    <a-tabs
      v-model:active-key='currentTab'
      class='flex-shrink-0'
      hide-content
      @update:active-key='updateCurrentTab'
    >
      <a-tab-pane
        v-for='tab in tabs'
        :key='tab.key'
        :title='tab.title'
      />
    </a-tabs>
    <router-view />
  </div>
</template>

<script setup lang="ts">

const router = useRouter()
const route = useRoute()

const currentTab = ref(route.name as string)
const tabs = [
  {
    key: 'htmlOrgChart',
    title: 'html',
  },
  {
    key: 'svgOrgChart',
    title: 'svg',
  },
  {
    key: 'canvasOrgChart',
    title: 'canvas',
  },
]

function updateCurrentTab(value: string | number) {
  router.push({ name: value as string })
}

</script>
