import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'interactiveView',
    component: () => import('../pages/InteractiveView.vue'),
  },
  {
    path: '/organization-chart',
    name: 'organizationChart',
    component: () => import('../pages/OrganizationChart.vue'),
  },
  {
    path: '/virtual-list',
    name: 'virtualList',
    component: () => import('../pages/VirtualListExample.vue'),
  },
]
