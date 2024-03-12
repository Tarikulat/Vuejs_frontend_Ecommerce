import { createRouter, createWebHistory } from "vue-router";
import {
  HomePage,
  ShopPage,
  ProductDetailsPage,
  CheckoutPage,
  thankyou,
  AboutPage,
  ContactPage,
  FlashDealPage,
  FlashDealDetailsPage,
  campaignPage,
  campaignDetailsPage,
  BlogPage,
  BlogDetailsPage,
  Login,
  Registration,
  OrderList,
  Profile,
  test,
} from "@/views/pages";
import NProgress from "nprogress";
import {useAuth} from '@/stores'

const routes = [
  // Auth Pages
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Max Food | Login", guest: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: { title: "Max Food | Registration", guest: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { title: "Max Food | Profile", requiresAuth: true },
  },
  {
    path: "/order-list",
    name: "OrderList",
    component: OrderList,
    meta: { title: "Max Food | OrderList", requiresAuth: true },
  },

  // Other pages
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    meta: { title: "Max Food | Home Page" },
  },
  {
    path: "/shop-page",
    name: "shopPage",
    component: ShopPage,
    meta: { title: "Max Food | Shop Page" },
  },
  {
    path: "/product-details/:id/:slug",
    name: "productDetailsPage",
    component: ProductDetailsPage,
    meta: { title: "Max Food | Product Details" },
  },
  {
    path: "/checkout-page",
    name: "checkoutPage",
    component: CheckoutPage,
    meta: { title: "Max Food | Checkout Page" },
  },
  {
    path: "/test",
    name: "test",
    component: test,
    meta: { title: "Max Food | test Page" },
  },
  {
    path: "/your-order-submited",
    name: "thankYou.page",
    component: thankyou,
    meta: { title: "Max Food | Thank You" },
  },
  {
    path: "/about-us",
    name: "aboutPage",
    component: AboutPage,
    meta: { title: "Max Food | About US" },
  },
  {
    path: "/contact-us",
    name: "contactPage",
    component: ContactPage,
    meta: { title: "Max Food | Contact US" },
  },
  {
    path: "/flash-deal",
    name: "flashDealPage",
    component: FlashDealPage,
    meta: { title: "Max Food | Flash Deals" },
  },
  {
    path: "/flash-deal-details/:campaignId/:productId",
    name: "FlashDealDetailsPage",
    component: FlashDealDetailsPage,
    meta: { title: "Max Food | Flash Deals Details" },
  },
  {
    path: "/campaign-page",
    name: "campaignPage",
    component: campaignPage,
    meta: { title: "Max Food | Campaign Page" },
  },
  {
    path: "/campaign-details-page/:campaignId/:productId",
    name: "campaignDetailsPage",
    component: campaignDetailsPage,
    meta: { title: "Max Food | Campaign Details Page" },
  },
  {
    path: "/blog-page",
    name: "blogPage",
    component: BlogPage,
    meta: { title: "Max Food | Blog Page" },
  },
  {
    path: "/blog-details-page/:postId",
    name: "blogDetailsPage",
    component: BlogDetailsPage,
    meta: { title: "Max Food | Blog Details Page" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //dynamiclly scroll behavior start
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
  //dynamiclly scroll behavior end
});

const DEFAULT_TITLE = "404";

router.beforeEach((to, from, next) => {
  // dynamiclly page title start
  document.title = to.meta.title || DEFAULT_TITLE;
  // dynamiclly page title end

  //dynamiclly scroll behavior start
  window.scrollTo(0, 0);
  //dynamiclly scroll behavior end

  // dynamiclly page progress bar start
  NProgress.start();
  // dynamiclly page progress bar end

  // dynamiclly Auth Checking Start
  const isLogin = useAuth();
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if (!isLogin.user.user) {
      next({name: 'Login'})  
    }else{
      next()
    }
  }else if(to.matched.some((record)=> record.meta.guest)){
    if (isLogin.user.user) {
      next({name: 'homePage'})  
    }else{
      next()
    }
  }else{
    next()
  }
// dynamiclly Auth Checking End
});

// dynamiclly page progress bar start
router.afterEach(() => {
  NProgress.done();
});
// dynamiclly page progress bar end


export default router;
