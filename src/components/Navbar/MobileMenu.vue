<script setup>
// All Import File  Code Is Here......................................................................................................
import { CartSideBar, CategorySideBar } from '@/components'

import { useCart } from '@/stores'
import { storeToRefs } from 'pinia';
// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { cartItemCount } = storeToRefs(cart);
// API Calling Code Is Here.....................................................................................................


// All Function  Code Is Here.....................................................................................................


function cartBtn(){
    $('body').css('overflow', 'hidden');
    $('.cart-sidebar').addClass('active');
    $('.cart-close').on('click', function(){
        $('body').css('overflow', 'inherit');
        $('.cart-sidebar').removeClass('active');
        $('.backdrop').fadeOut();
    });
}


function categorySideBar(){
    $('body').css('overflow', 'hidden');
    $('.category-sidebar').addClass('active');
    $('.category-close').on('click', function(){
        $('body').css('overflow', 'inherit');
        $('.category-sidebar').removeClass('active');
        $('.backdrop').fadeOut();
    });
}


</script>

<template lang="">
  <div>

<!--=====================================
                  CART SIDEBAR PART START
        =======================================-->
    <CartSideBar />
    <!--=====================================
                    CART SIDEBAR PART END
        =======================================-->

        <!--=====================================
                CATEGORY SIDEBAR PART START
        =======================================-->
      <CategorySideBar />
    <!--=====================================
                CATEGORY SIDEBAR PART END
        =======================================-->

    <div class="mobile-menu">
      <router-link :to="{ name: 'homePage' }">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </router-link>
      <button class="cate-btn" title="Category List" @click="categorySideBar()">
          <i class="fas fa-list"></i>
          <span>category</span>
      </button>
      <router-link title="Shop Page" :to="{ name: 'shopPage'}">
        <i class="fas fa-store"></i>
        <span>Shop</span>
      </router-link>
      <router-link title="Shop Page" :to="{ name: 'blogPage'}">
        <i class="fa-solid fa-blog"></i>
        <span>Blog</span>
      </router-link>
      <button title="Shop Page"  @click="cartBtn">
        <i class="fas fa-shopping-basket"></i>
        <span>cartlist</span>
        <sup>{{ cartItemCount }}+</sup>
      </button>
    </div>
  </div>
</template>

<style>

</style>
