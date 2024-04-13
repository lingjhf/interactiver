<template>
  <Menu
    id='a'
    class='border-none'
    :index='1'
    :model='menusItems'
  />
</template>

<script setup lang="ts">
import { MenuItem } from 'primevue/menuitem'
import { RouteRecordRaw } from 'vue-router'

import { routes } from '../router'

const router = useRouter()
const menusItems = ref(routesToMenus(routes))

const currentItem = ref<MenuItem>(menusItems.value[0])
function routesToMenus(routes: RouteRecordRaw[]): MenuItem[] {
  return routes.map(route => ({ label: route.name?.toString() ?? '', command: (event) => {
    router.push(route)
  } }))
}
</script>
