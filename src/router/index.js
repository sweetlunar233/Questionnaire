import { name } from 'element-plus/dist/locale/zh-cn'
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
    component: () => import('../views/UserManageView.vue'),
    redirect:'/userManage/filled',
    children: [
      {
        path: '/userManage/unreleased',
        name: 'unreleasedQuestinaire',
        component: () => import('../views/user/UnreleasedQuestionnaire.vue')
      },
      {
        path: '/userManage/released',
        name: 'releasedQuestinaire',
        component: () => import('../views/user/ReleasedQuestionnaire.vue')
      },
      {
        path: '/userManage/filled',
        name: 'filledQuestinaire',
        component: () => import('../views/user/FilledQuestionnaire.vue')
      },
      {
        path: '/userManage/square',
        name: 'square',
        component: () => import('../views/user/SquareView.vue')
      }
      ,
      {
        path: '/userManage/personal',
        name: 'personal1',
        component: () => import('../views/user/PersonalView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/PersonalView.vue'),
    redirect: '/personal/message',
    children:[
      { 
        path: '/personal/message',
        name: 'personalMessage',
        component: () => import('../views/personal/PersonalMessageView.vue')
      },
      { 
        path: '/personal/shop',
        name: 'personalShop',
        component: () => import('../views/personal/PersonalShopView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
