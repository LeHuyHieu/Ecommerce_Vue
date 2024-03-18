import { createWebHistory, createRouter } from "vue-router";
import AuthService from "@/services/AuthService";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/detail-product/:id",
    name: "detail-product",
    component: () => import("./views/DetailProduct.vue")
  },
  {
    path: "/cart",
    name: "cart",
    meta: {
      requiresAuth: true
    },
    component: () => import("./views/CartPage.vue")
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: {
      requiresAuth: true
    },
    component: () => import("./views/Checkout.vue")
  },
  {
    path: "/list-product",
    name: "list-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./views/products/HomeProduct")
  },
  {
    path: "/add-product",
    name: "add-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./views/products/Create.vue")
  },
  {
    path: "/edit-product/:id",
    name: "edit-product",
    meta: {
      requiresAuth: true
    },
    component: () => import("./views/products/Edit.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login")
  },
  { 
    path: '/:pathMatch(.*)', redirect: '/404' 
  },
  { 
    path: '/404', component: () => import("./views/PageNotFound") 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  let isLogin  = AuthService.isLogin()
  const isCartOrCheckoutPage = to.name === 'cart' || to.name === 'checkout';

  if (!isCartOrCheckoutPage) {
    localStorage.removeItem('list-checkout');
  }

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