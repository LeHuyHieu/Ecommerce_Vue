import { createWebHistory, createRouter } from "vue-router";
import AuthService from "./services/AuthService";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/Home.vue")
  },
  {
    path: "/detail-product/:id",
    name: "detail-product",
    component: () => import("./components/DetailProduct.vue")
  },
  {
    path: "/cart",
    name: "cart",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/CartPage.vue")
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/Checkout.vue")
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
  { 
    path: '/:pathMatch(.*)', redirect: '/404' 
  },
  { 
    path: '/404', component: () => import("./components/PageNotFound") 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  let isLogin  = AuthService.isLogin()

  if (to.path === '/login' && isLogin) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isLogin) {
    next('/login')
    return
  }
  next()
})

export default router;