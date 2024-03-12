<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";

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
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
<section class="section category-part">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading">
              <h2>shop by categories</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="category-slider slider-arrow">

              <!-- <swiper
                :slidesPerView="4"
                :sliderPerGroup="4"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="category-wrap">
                <div class="category-media">
                  <img src="@/assets/images/category/dairy.jpg" alt="category" />
                  <div class="category-overlay">
                    <a href="shop-4column.html"><i class="fas fa-link"></i></a>
                  </div>
                </div>
                <div class="category-meta">
                  <h4>dairy items</h4>
                  <p>(25 items)</p>
                </div>
                   </div>
                </swiper-slide>
              </swiper> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-50">
              <a href="all-category.html" class="btn btn-outline">
                <i class="fas fa-eye"></i>
                <span>view all category</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>

</style>
