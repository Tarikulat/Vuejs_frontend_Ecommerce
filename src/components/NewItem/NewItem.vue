<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";
import { ProductCard } from '@/components'
import { ProductSkeleton} from '@/components/skeleton'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";



// All Variable  Code Is Here.....................................................................................................
const newSlide = ref([Navigation]);
const modules = ref([Pagination, Autoplay]);

const props = defineProps({
  featureProducts: Object,

})




// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <section class="section newitem-part">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>collected new items</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="new-slider slider-arrow">
            <template v-if="!featureProducts.data">
              <ProductSkeleton :dataAmount='4' :cols="4"/>
            </template>
            <template v-else>
              <swiper
                :slidesPerView="1"
                :sliderPerGroup="4"
                :loop="true"
                :breakpoints="{ 320:{ slidesPerView:1,spaceBetweenSlides: 40  },480:{ slidesPerView:3,spaceBetweenSlides: 30  }, 790:{ slidesPerView:4,spaceBetweenSlides: 40 } }"
                :autoplay="{
                  delay: 2000,
                }"
                
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
                
              >
                <swiper-slide v-for="(product, index) in featureProducts.data" :key="index">
                  <li>
                    <ProductCard :product="product" :type="'Feature'" :types="'feat'"/>
                  </li>
                </swiper-slide>
              </swiper>
            </template>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <router-link :to="{ name: 'shopPage', query: {feature: 'feature-product'}}" class="btn btn-inline">
                <i class="fas fa-eye"></i>
                <span>আরো দেখুন </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>

.swiper-button-prev, .swiper-button-next{
    border-radius: 50%;
    color: #ff0000;
    background: #ffffff;
    line-height: 45px;
    width: 45px;
    font-weight: 900;
}
.swiper-button-prev:after, .swiper-button-next:after{
    font-size: 20px !important;
}

.swiper-button-prev:hover, .swiper-button-next:hover{
    border-radius: 50%;
    background: #ff0000;
    color: white;
}
</style>
