<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref,onMounted } from 'vue';
import {HomeSliderSkeleton, CategorySkeleton} from '@/components/skeleton'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination,Autoplay, Navigation } from 'swiper/modules'

// slider get data 
import { storeToRefs } from 'pinia';
// slider data fetch 
import {useSlider, useCategory} from '@/stores'


// All Variable  Code Is Here.....................................................................................................
const newSlide = ref([Navigation])
const modules = ref([Pagination,Autoplay]);

// slider data fetch 
const slider = useSlider();
const {sliders} = storeToRefs(slider)
// category data fetch 
const category = useCategory();
const {categories} = storeToRefs(category)

onMounted(() => {
    slider.getData();
    category.getData();
})

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <section class="banner-part">

      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="banner-category">
              <div class="banner-category-head">
                <i class="fas fa-bars"></i>
                <span>top categories</span>
              </div>
              <ul class="banner-category-list">
                <template v-if="!categories.result">
                  <CategorySkeleton />
                </template>
                <template v-else>
                  <li class="banner-category-item" v-for="(category, index) in categories.result" :key="index">
                    <router-link :to="{ name: 'shopPage', query: { category: category.id }}">
                      <i class="flaticon-vegetable"></i>
                      <span>{{ category.name }}</span>
                    </router-link>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div class="home-grid-slider slider-dots">
                   <template v-if="!sliders.result">
                      <HomeSliderSkeleton />
                   </template>
                   <template v-else>
                   <swiper
                      :slidesPerView="1"
                      :sliderPerGroup="1"
                      :loop="true"
                      :pagination="{
                        clickable: true,
                      }"
                      :autoplay="{
                          delay: 2000,
                        }"
                      :modules="modules"
                      
                      class="mySwiper"
                    >
                      <swiper-slide v-for="(slider, index) in sliders.result" :key="index">
                        <div class="banner-image">
                          <img :src="slider.image" alt="" />
                        </div>
                      </swiper-slide>
                    </swiper>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6 col-lg-6 d-none d-sm-block">
                <div class="banner-promo">
                  <a href="#"
                    > <img src="@/assets/images/promo/home/4.png" alt="promo"
                  /></a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 d-none d-sm-block">
                <div class="banner-promo">
                  <a href="#"
                    > <img src="@/assets/images/promo/home/5.png" alt="promo"
                  /></a>
                </div>
              </div>  
        </div>
      </div>
    </section>

  </div>
</template>

<style>
.banner-category-list {
  max-height: 315px; /* Set your desired height */
  overflow-y: auto; /* Enable vertical scrollbar when needed */
  overflow-x: hidden; /* Enable vertical scrollbar when needed */
}

.banner-category-dropdown{
  z-index: 999999 !important;
}

.banner-promo a {
  width: 100%;
}

.banner-image{
   max-height: 272px;
}

</style>
