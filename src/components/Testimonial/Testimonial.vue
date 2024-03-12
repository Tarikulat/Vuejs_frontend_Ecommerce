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
  <section class="section testimonial-part">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading">
              <h2>client's feedback</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="testimonial-slider slider-arrow">

              <swiper
                :slidesPerView="3"
                :sliderPerGroup="3"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide>
                 <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit neque earum
                  sapiente vitae obcaecati magnam doloribus magni provident
                  ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                </ul>
                <img src="@/assets/images/avatar/01.jpg" alt="testimonial" />
              </div>
                </swiper-slide>
                <swiper-slide>
                 <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit neque earum
                  sapiente vitae obcaecati magnam doloribus magni provident
                  ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                </ul>
                <img src="@/assets/images/avatar/01.jpg" alt="testimonial" />
              </div>
                </swiper-slide>
                <swiper-slide>
                 <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit neque earum
                  sapiente vitae obcaecati magnam doloribus magni provident
                  ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                </ul>
                <img src="@/assets/images/avatar/01.jpg" alt="testimonial" />
              </div>
                </swiper-slide>
                <swiper-slide>
                 <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit neque earum
                  sapiente vitae obcaecati magnam doloribus magni provident
                  ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                </ul>
                <img src="@/assets/images/avatar/01.jpg" alt="testimonial" />
              </div>
                </swiper-slide>
                <swiper-slide>
                 <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit neque earum
                  sapiente vitae obcaecati magnam doloribus magni provident
                  ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                </ul>
                <img src="@/assets/images/avatar/01.jpg" alt="testimonial" />
              </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>

</style>
