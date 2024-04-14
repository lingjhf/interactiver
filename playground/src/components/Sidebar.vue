<template>
  <v-list
    :items='menusItems'
    :selected='currentMenu'
    @update:selected='selectedMenu'
  />
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

import { routes } from '../router'

const router = useRouter()
const route = useRoute()
const currentMenu = ref<string[]>([])
const menusItems = ref(routesToMenus(routes))

watch(route, () => {
  const name = route.name?.toString()
  if (name) {
    currentMenu.value = [name]
  }
})

function routesToMenus(routes: RouteRecordRaw[]) {
  return routes.map((item) => {
    return {
      title: item.name,
      value: item.name,
    }
  })
}

function selectedMenu(menus: string[]) {
  if (menus.length > 0) {
    router.push({ name: menus[0] })
  }
}
</script>
