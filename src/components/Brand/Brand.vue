<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
// product data fetch 
import {useBrand} from '@/stores'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// All Variable  Code Is Here.....................................................................................................
const brand = useBrand();
const { brands } = storeToRefs(brand);
const newSlide = ref([Navigation]);
const modules = ref([Pagination, Autoplay]);
// API Calling Code Is Here.....................................................................................................
onMounted(() => {
  brand.getData();
})

// All Function  Code Is Here.....................................................................................................

function calculateSlides() {
  if (window.innerWidth < 768) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 5;
  }
}
</script>

<template>
  <div>
    <section class="section brand-part">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading">
              <h2>shop by brands</h2>
            </div>
          </div>
        </div>
        <div class="brand-slider slider-arrow">
          <swiper
            :slidesPerView="5"
            :sliderPerGroup="5"
            :loop="true"
            :autoplay="{
              delay: 2000,
            }"
            :navigation="true"
            :modules="newSlide"
            class="mySwiper"
            :breakpoints="{ 320:{ slidesPerView:2,spaceBetweenSlides: 20  },480:{ slidesPerView:3,spaceBetweenSlides: 30  }, 790:{ slidesPerView:5,spaceBetweenSlides: 40 } }"
            
          >
            <swiper-slide v-for="(brand, index) in brands.result" :key="index">
              <div class="brand-wrap" >
                <div class="brand-media">
                  <img :src="brand.image" alt="brand" />
                  <div class="brand-overlay">
                    <router-link :to="{ name: 'shopPage', query: {brand: brand.id}}"><i class="fas fa-link"></i></router-link>
                  </div>
                </div>
                <div class="brand-meta">
                  <h4>{{ brand.name }}</h4>
                  <!-- <p>(45 items)</p> -->
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
  </div>
</template>

<style>


</style>
