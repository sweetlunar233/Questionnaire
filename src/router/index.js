import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/dataPre',
    name: 'dataPre',
    component: () => import('../views/DataPreView.vue')
  },
  {
    path: '/questionnaireDesign',
    name: 'questionnaireDesign',
    component: () => import('../views/QuestionnaireDesignView.vue')
  },
  {
    path: '/questionnaireFill',
    name: 'questionnaireFill',
    component: () => import('../views/QuestionnaireFillView.vue')
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('../views/UserManageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
