import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'interactiveView',
    component: () => import('../pages/InteractiveView.vue'),
  },
  {
    path: '/org-chart',
    name: 'orgChart',
    component: () => import('../pages/org-chart/OrgChart.vue'),
    children: [
      {
        path: 'html',
        name: 'htmlOrgChart',
        component: () => import('../pages/org-chart/HtmlOrgChart.vue'),
      },
      {
        path: 'svg',
        name: 'svgOrgChart',
        component: () => import('../pages/org-chart/SvgOrgChart.vue'),
      },
      {
        path: 'canvas',
        name: 'canvasOrgChart',
        component: () => import('../pages/org-chart/CanvasOrgChart.vue'),
      },
    ],
  },
  {
    path: '/virtual-list',
    name: 'virtualList',
    component: () => import('../pages/VirtualListExample.vue'),
  },
]
