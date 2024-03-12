<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {HomeSliderSkeleton} from '@/components/skeleton'
import { BannerPart, CategorySideBar, CartSideBar, NavSideBar, MobileMenu }  from '@/components'
import axiosInstance from "@/services/axiosService.js";
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
import { useSlider, useCart, useNotification } from '@/stores'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { loading } = storeToRefs(cart);
const notify = useNotification();
const isloading = ref(loading);
const color = 'white';
const size = '8px';
const quantityInput = ref(1);
const props = defineProps({
    product: Object,
    types: String,
    required: true,
})

const price = ref()

function addToCart(tProduct, privotCampaign) {
  if (privotCampaign.offer_price != 0) {
    price.value = privotCampaign.offer_price;
  } else {
    price.value = privotCampaign.mrp;
  }

  cart.addToCart({
    item_id: tProduct.id,
    campaign_id: privotCampaign.campaign_id,
    name: tProduct.name,
    mrp: privotCampaign.mrp,
    offer_price: privotCampaign.offer_price,
    image: tProduct.image,
    size_id: "",
    quantity: quantityInput.value,
    free_shipping: tProduct.free_shipping,
  });

  notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
  
}






// All Variable  Code Is Here.....................................................................................................

const campaignProducts = ref()
const startDate = ref()
const endDate = ref()
const productTimer = ref(true)

const newSlide = ref([Navigation])
const modules = ref([Pagination,Autoplay]);



// slider data fetch 
const slider = useSlider();
const {sliders} = storeToRefs(slider)

// flash deal timer start

const time = {
  days: ref(0),
  hours: ref(0),
  minutes: ref(0),
  seconds: ref(0),
};

let timer = null;

const padSingleDigit = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
}

// Function to parse startDate if it's in a non-standard format
const parseStartDate = (startDate) => {
  const parts = startDate.split(/[- :]/);
  return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
};


const startCountdown = (startDate, endDate) => {
    //end Date
  const targetDate = new Date(endDate).getTime();

    const parsedStartDate = parseStartDate(startDate);

    timer = setInterval(() => {
    //Start Date
    const now = new Date().getTime();
    const distance = targetDate - now;

     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update values with padded single digits without quotes
    time.days.value = padSingleDigit(days);
    time.hours.value = padSingleDigit(hours);
    time.minutes.value = padSingleDigit(minutes);
    time.seconds.value = padSingleDigit(seconds);

    if (distance < 0) {
      clearInterval(timer);
      time.days.value = '00';
      time.hours.value = '00';
      time.minutes.value = '00';
      time.seconds.value = '00';

        productTimer.value = false;
    }
  }, 1000);
};

// flash deal timer end

onMounted(() => {
  slider.getData();
    index()

    $(document).ready(function () {
      $('.venobox').venobox();
    });
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
  
});

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................

   const index = async() => {
     try {
         const res = await axiosInstance.get(`/campaigns`, 
         {
            params:{
              "campaign_id":1,
            }
          }
         );

         console.log(res);
         startDate.value = res.data.result.start_date
         endDate.value = res.data.result.end_date
         startCountdown(startDate.value, endDate.value)
         campaignProducts.value = res.data.result.products
        
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      } 
   }
</script>

<template>
    <div>
       <BannerPart :title="'Flash Deals'"/>

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

<section class="banner-part">
      <div class="container">
        <div class="home-grid-slider slider-dots">
                <template v-if="!sliders.result">
                    <HomeSliderSkeleton />
                </template>
                <template v-else>
                <swiper
                    :slidesPerView="1"
                    :sliderPerGroup="1"
                    :pagination="{
                        clickable: true,
                    }"
                    :loop="true"
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
</section>


<section class="banner-part">
  <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="countdown deals-clock" data-countdown="2021/12/31">
                <span class="countdown-time"><span>{{ time.days.value }}</span><small>দিন</small></span>
                <span class="countdown-time"><span>{{ time.hours.value }}</span><small>ঘন্টা</small></span>
                <span class="countdown-time"><span>{{ time.minutes.value }}</span><small>মিনিট</small></span>
                <span class="countdown-time"><span>{{ time.seconds.value }}</span><small>সেকেন্ড</small></span>
            </div>
        </div>
       </div>
    </div>
</section>

        <!--=====================================
                    SHOP PART START
        =======================================-->
        <section class="inner-section shop-part" v-if="productTimer">
            <div class="container">
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
                    <div class="col" v-for="(campaignProduct, index) in campaignProducts" :key="index">
                        <div class="product-card">
                            <div class="product-media">
                                 <router-link :to="{name: 'FlashDealDetailsPage', params : { campaignId: campaignProduct.pivot.campaign_id, productId : campaignProduct.pivot.product_id }}" class="product-image">
                                   <img :src="campaignProduct.image" alt="product" />
                                </router-link>
                                <div class="product-widget" v-show="campaignProduct.video_url">
                                  <a title="Product Video" :href="campaignProduct.video_url" class="venobox fas fa-play" data-vbtype="video" data-autoplay="true"></a>
                              </div>
                            </div>
                            <div class="product-content">
                                <h6 class="product-name">
                                  <router-link :to="{name: 'FlashDealDetailsPage', params : { campaignId: campaignProduct.pivot.campaign_id, productId : campaignProduct.pivot.product_id }}">{{ campaignProduct.name }}</router-link>
                                </h6>
                                <h6 class="product-price" v-if="campaignProduct.campaign_product_prices.length > 0">
                                  <span> Choose the size first </span>
                                </h6>
                                <h6 class="product-price" v-else>
                                  <del>{{ $filters.currencySymbol(campaignProduct.pivot.mrp) }}</del>
                                  <span>{{ $filters.currencySymbol(campaignProduct.pivot.offer_price) }}</span>
                                </h6>

                                <template v-if="campaignProduct.campaign_product_prices.length > 0">
                                  <router-link :to="{
                                        name: 'FlashDealDetailsPage',
                                        params: { campaignId: campaignProduct.id, productId: campaignProduct.id },}" class="product-add" title="Add to Cart">
                                        <i class="fas fa-shopping-basket"></i>
                                        <span>সিলেক্ট করুন</span>
                                      </router-link>
                                      </template>
                                      <template v-else>
                                        <button class="product-add" title="Add to Cart" @click.prevent="addToCart(campaignProduct, campaignProduct.pivot)">
                                          <template v-if="cart.loading === campaignProduct.id">
                                              <pulse-loader :loading="isloading" :color="color" :size="size"></pulse-loader>
                                          </template>
                                          <template v-else>
                                              <i class="fas fa-shopping-cart"></i>
                                          </template>
                                          <span>কার্টে যোগ করুন</span>
                                        </button>
                                  
                                      </template>
                                
                                <div class="product-action">
                                    <button class="action-minus" title="Quantity Minus"><i class="icofont-minus"></i></button>
                                    <input class="action-input" title="Quantity Number" type="text" name="quantity" value="1">
                                    <button class="action-plus" title="Quantity Plus"><i class="icofont-plus"></i></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="inner-section shop-part" v-else>
           <div class="container">
                <h1 class="text-danger">The Flash Deals Offer Is Close</h1>
           </div>
        </section>
        <!--=====================================
                    SHOP PART END
        =======================================-->
    </div>
</template>

<style scope>
.banner-category-list {
  max-height: 406px; /* Set your desired height */
  overflow-y: auto; /* Enable vertical scrollbar when needed */
  overflow-x: hidden; /* Enable vertical scrollbar when needed */
}

.banner-category-dropdown{
  z-index: 999999 !important;
}

.banner-image{
   max-height: 360px !important;
}
</style>
