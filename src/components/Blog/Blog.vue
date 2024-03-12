<script setup>
/// All Import File  Code Is Here......................................................................................................
import { CartSideBar, MobileMenu } from '@/components';
import { ref, onMounted, computed } from "vue";
import { useBlog } from '@/stores'
import { storeToRefs } from 'pinia';
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




const blog = useBlog();
// getBlogPost data start
const blogPostData = ref()
// getBlogPost data end

// getBlogPost data start
const getBlogPost = async (tagID = '', BlogPost = '') => {
    const res = await blog.getBlogPost(tagID, BlogPost); 
    if (res.success) {
        blogPostData.value = res.result.data
    }
}



// Define a computed property to format the date
const formattedDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};
// getBlogPost data end






onMounted(() => {
  getBlogPost();
  // blog.getBlogPost(); 
});

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
  <section class="section blog-part">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading">
              <h2>Read our articles</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="blog-slider slider-arrow">

              <swiper
                :slidesPerView="3"
                :sliderPerGroup="3"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :breakpoints="{ 320:{ slidesPerView:1,spaceBetweenSlides: 40  },480:{ slidesPerView:3,spaceBetweenSlides: 30  }, 790:{ slidesPerView:4,spaceBetweenSlides: 40 } }"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide v-for="(blogPost, index) in blogPostData" :key="index">
                 <div class="blog-card">
                <div class="blog-media">
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-img" href="#">
                      <img :src="blogPost.image" alt="blog">
                  </router-link>
                </div>
                <div class="blog-content">
                  <ul class="blog-meta">
                    <li>
                      <i class="fas fa-user"></i>
                      <span>admin</span>
                    </li>
                    <li>
                      <i class="fas fa-calendar-alt"></i>
                      <span>{{ formattedDate(blogPost.created_at) }}</span>
                    </li>
                  </ul>
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-title">
                      <a href="blog-details.html">{{ blogPost.title }}</a>
                  </router-link>
                  <p class="blog-desc">
                      {{ $filters.textShort(blogPost.description, 100) }}
                  </p>
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-btn" href="#">
                      <span>read more</span>
                      <i class="icofont-arrow-right"></i>
                  </router-link>
                </div>
              </div>
                </swiper-slide>
              </swiper>  
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="blog-grid.html" class="btn btn-outline">
                <i class="fas fa-eye"></i>
                <span>view all blog</span>
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
