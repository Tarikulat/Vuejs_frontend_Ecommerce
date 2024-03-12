<script setup>
import { CategorySideBar, CartSideBar,ProductCard, NavSideBar, MobileMenu,  Blog, ProductView, PromoPart, Banner, IntroPart, NewItem, Brand } from '@/components'
// product data fetch 
import {useProduct} from '@/stores'
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { ProductSkeleton} from '@/components/skeleton'
import axiosInstance from "@/services/axiosService.js";
// All Variable  Code Is Here.....................................................................................................
const product = useProduct();
const { recentProducts, topProducts, featureProducts } = storeToRefs(product);


const bannerAllItems = ref({});
// API Calling Code Is Here.....................................................................................................

const banner = async() => {
  const res = await axiosInstance.get("/banners");
  bannerAllItems.value = res.data.result;
}

// All Function  Code Is Here.....................................................................................................

onMounted(() => {
  banner();
  product.getData("feature-product", 8);
  product.getData("top-product", 8);
  product.getData("recent-product", 8);
})


</script>

<template>

  <div>
      <!--=====================================
                CATEGORY SIDEBAR PART START
        =======================================-->
      <CategorySideBar />
    <!--=====================================
                CATEGORY SIDEBAR PART END
        =======================================-->

    <!--=====================================
                  CART SIDEBAR PART START
        =======================================-->
    <CartSideBar />
    <!--=====================================
                    CART SIDEBAR PART END
        =======================================-->

    <!--=====================================
                  NAV SIDEBAR PART START
        =======================================-->
    <NavSideBar />
    <!--=====================================
                  NAV SIDEBAR PART END
        =======================================-->

    <!--=====================================
                    MOBILE-MENU PART START
        =======================================-->
    <MobileMenu />
    <!--=====================================
                    MOBILE-MENU PART END
        =======================================-->

    <!--=====================================
                    PRODUCT VIEW START
        =======================================-->
    <ProductView />
    <!--=====================================
                    PRODUCT VIEW END
        =======================================-->

    <!--=====================================
                    BANNER PART START
        =======================================-->
    <Banner />
    <!--=====================================
                    BANNER PART END
        =======================================-->
   
    <!--=====================================
                    INTRO PART START
        =======================================-->
    
    <!--=====================================
                    INTRO PART END
        =======================================-->

    <!--=====================================
                    Recent Product START
        =======================================-->
        <section class="section deals-part">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-heading">
                  <h2>Recent Product</h2>
                </div>
              </div>
            </div>
            <template v-if="!recentProducts.data">
              <ProductSkeleton :dataAmount='8' :cols="4"/>
            </template>
            <template v-else> 
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
              <div class="col" v-for="(product, index) in recentProducts.data" :key="index">
                <ProductCard :product="product" :types="'sale'"/>
              </div>
            </div>
            </template>
            <div class="row">
              <div class="col-lg-12">
                <div class="section-btn-25">
                  <router-link :to="{ name: 'shopPage', query: {recent: 'recent-product'}}" class="btn btn-inline">
                    <i class="fas fa-eye"></i>
                    <span>আরো দেখুন </span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
    <!--=====================================
                    Recent Product END
        =======================================-->

    <!--=====================================
                    PROMO PART START
        =======================================-->
    <PromoPart  :bannerAllItems="bannerAllItems[0]"/>
    <!--=====================================
                    PROMO PART END
        =======================================-->
    <!--=====================================
                    Top Product START
        =======================================-->
      <section class="section deals-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Top Product</h2>
            </div>
          </div>
        </div>
        <template v-if="!topProducts.data">
          <ProductSkeleton :dataAmount='8' :cols="4"/>
        </template>
        <template v-else>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div class="col" v-for="(product, index) in topProducts.data" :key="index">
            <ProductCard :product="product" :types="'new'"/>
          </div>
        </div>
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <router-link :to="{ name: 'shopPage', query: {top: 'top-product'}}" class="btn btn-inline">
                <i class="fas fa-eye"></i>
                <span>আরো দেখুন </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
     </section>
    <!--=====================================
                    Top Product END
        =======================================-->

    <!--=====================================
                    PROMO PART START
        =======================================-->
    <PromoPart :bannerAllItems="bannerAllItems[1]"/>
    <!--=====================================
                    PROMO PART END
        =======================================-->
    <!--=====================================
                    Slider Feature Product START
        =======================================-->
     <NewItem :featureProducts="featureProducts"/>
    <!--=====================================
                    Slider Feature Product END
        =======================================-->

    <!--=====================================
                    PROMO PART START
        =======================================-->
    <PromoPart :bannerAllItems="bannerAllItems[2]"/>
    <!--=====================================
                    PROMO PART END
        =======================================-->

    <!--=====================================
                      BLOG PART START
        =======================================-->
    <Blog />
    <!--=====================================
                      BLOG PART END
        =======================================-->
  </div>
</template>
