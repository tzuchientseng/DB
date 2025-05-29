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

import { createRouter, createWebHashHistory } from 'vue-router'
import DocsView from ''
const router = createRouter({
  history: createWebHashHistory(),
  router: [
    {
      path: '/',
      name: 'home',
      component: ,
    },
    {
      path: '/docs',
      name: 'document',
      component: DocsView,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/login',
    //   name: 'auth',
    //   component: ,
    // },
  ],
})
export default router

