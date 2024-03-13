import { createWebHistory, createRouter } from "vue-router";
// import { auth } from "./firebase";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/HomeProduct")
  },
  {
    path: "/list-product",
    name: "list-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/HomeProduct")
  },
  {
    path: "/add-product",
    name: "add-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/products/Create.vue")
  },
  {
    path: "/edit-product/:id",
    name: "edit-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/products/Edit.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/Register")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login")
  },
  { path: '/:pathMatch(.*)', redirect: '/404' },
    { path: '/404', component: () => import("./components/PageNotFound") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');

  if (to.path === '/login' && user) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/login')
    return
  }
  next()
})

export default router;