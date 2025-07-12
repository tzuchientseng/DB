// // `npm run deploy` For Github SPA
// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//   history: createWebHashHistory,
//   routes: [
//     { path: '/', name: 'home', component: () => import('') },
//     { path: '/docs', name: 'document', component: () => import('') },
//     // { path: '/login', name: 'auth', component: () => import('') },
//   ]
// })
// export default router

import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '@/components/TodoPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoPage,
    },
    // {
    //   path: '/login',
    //   name: 'auth',
    //   component: TodoPage,
    // },
  ],
})
export default router

