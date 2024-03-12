<script setup>
// All Import File  Code Is Here......................................................................................................
import { onMounted, ref } from "vue";
import { storeToRefs } from 'pinia';
import {useCart, useSetting} from '@/stores'
import axiosInstance from "@/services/axiosService.js";
import { CategorySideBar  } from '@/components'

// All Variable  Code Is Here.....................................................................................................
const setting = useSetting();
const cart = useCart();
const { cartItemCount, totalPrice } = storeToRefs(cart);

const settings = ref()
const searchData = ref([]);
const name = ref('');
// API Calling Code Is Here.....................................................................................................


// All Function  Code Is Here.....................................................................................................

const getSetingInfo = async() => {
    settings.value  =  await setting.getData('logo')
}

const getProducts = async() =>{
    try {
        const res = await axiosInstance.get(`/products`, 
            {
                params:{
                    name: name.value,
                    paginate_size:5,
                }
            }
        );
        console.log(res.data.result.data);
        searchData.value = res.data.result.data
    } catch (error) {
        console.log(error);
    }
}

const clearSearchBar = () =>{
        name.value='';
    }


//========================================
//        CATEGORY SIDEBAR FUNCTION
//========================================
function categorySideBar(){
    $('body').css('overflow', 'hidden');
    $('.category-sidebar').addClass('active');
    $('.category-close').on('click', function(){
        $('body').css('overflow', 'inherit');
        $('.category-sidebar').removeClass('active');
        $('.backdrop').fadeOut();
    });
}


//========================================
//       RESPONSIVE SEARCH BAR
//========================================
function searchFrom(){
    $('.header-form').toggleClass('active');
    $(this).children('.fa-search').toggleClass('fa-times');
}

onMounted(() => {
    getSetingInfo()  
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
    <header class="header-part">
      <div class="container">
        <div class="header-content">
          <div class="header-media-group">
            <button class="cate-btn" title="Category List" @click="categorySideBar()">
                <i class="fas fa-list"></i>
            </button>
            <router-link :to="{ name: 'homePage'}"><img :src="settings?.data[0]?.logo" alt="logo" /></router-link>
            <button class="header-src" @click.prevent="searchFrom()"><i class="fas fa-search"></i></button>
          </div>
          <router-link :to="{ name: 'homePage'}" class="header-logo">
            <img :src="settings?.data[0]?.logo" alt="logo" />
          </router-link>

          <form class="header-form">
                <input type="search" placeholder="Search anything..."  v-model="name" @input="getProducts()"/>
                <button type="submit">
                    <i class="fas fa-search"></i>
                </button>
                <ul class="search-data" v-if="name != ''">
                    <li v-for="(product, index) in searchData" :key="index">
                        
                        <router-link :to="{name:'productDetailsPage',params: { id: product.id, slug: product.slug }}" @click="clearSearchBar" class="product-info">
                            <div class="row search-row">
                                <div class="col-md-1 col-sm-2 search-img">
                                    <img :src="product.image" alt="" style="border-radius: 5px; width: 35px;">
                                </div>
                                <div class="col-md-7 col-sm-5 search-details">
                                    <p style="color:#000; margin: 0;line-height: 1.2;">{{ product.name }}</p>
                                    <span style="font-size: 12px;"><span style="color: #000; font-weight: 500;">Category : </span> {{ product.category.name }}</span>
                                </div>
                                <div class="col-md-4 col-sm-5 search-price">
                                    <p>
                                        <span v-if="product.offer_percent !=0" class="featured_label">{{Math.floor(product.offer_percent)}}% Off</span>
                                    </p>
                                    <div>
                                        <span class="product-price" v-if="product.mrp !=0" style="font-weight: 400;">
                                            <del v-if="product.offer_price !=0">{{product.mrp}} tk </del>
                                            <span>{{ product.offer_price !=0? product.offer_price : product.mrp  }} tk</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </form>

          <div class="header-widget-group">
            <button class="header-widget header-cart" title="Cartlist">
              <i class="fas fa-shopping-cart"></i>
              <sup>{{ cartItemCount }}+</sup>
              <span>total price<small>{{ $filters.currencySymbol(totalPrice) }}</small></span>
            </button>
          </div>
        </div>
      </div>
    </header> 

    <!-- <header class="header-part">
            <div class="container">
                <div class="header-content">
                    <div class="header-media-group">
                        <button class="header-user"><img src="@/assets/images/user.png" alt="user"></button>
                        <a href="index.html"><img src="@/assets/images/logo.png" alt="logo"></a>
                        <button class="header-src"><i class="fas fa-search"></i></button>
                    </div>

                    <router-link :to="{ name: 'homePage'}"><img src="@/assets/images/maxfit.png" class="w-50" alt="logo" /></router-link>
                    <button class="header-src" @click.prevent="searchFrom()"><i class="fas fa-search"></i></button>

                    <form class="header-form">
                        <input type="text" placeholder="Search anything...">
                        <button><i class="fas fa-search"></i></button>
                    </form>

                    <div class="header-widget-group">
                        <a href="compare.html" class="header-widget" title="Compare List">
                            <i class="fas fa-random"></i>
                            <sup>0</sup>
                        </a>
                        <a href="wishlist.html" class="header-widget" title="Wishlist">
                            <i class="fas fa-heart"></i>
                            <sup>0</sup>
                        </a>
                        <button class="header-widget header-cart" title="Cartlist">
                            <i class="fas fa-shopping-basket"></i>
                            <sup>9+</sup>
                            <span>total price<small>$345.00</small></span>
                        </button>
                    </div>
                </div>
            </div>
        </header> -->

  </div>
</template>

<style>
.cate-btn{
  font-size:25px;
}

.header-form{
        position: relative;
    }
    .form-style{
        padding: 3px 10px;
        margin-left: 10px;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
    }
    .search-data{
        position: absolute;
        width: 100%;
        z-index: 9;
        top: 52px;
        left: 0;
        background-color: #F5F5F5;
        border-radius: 10px;
        border-bottom: 2px ;
    }
    .product-info{
        display: block;
        padding: 10px 10px;
    }
    .search-data li {
        border-top: 1px solid rgb(220, 221, 220);
        position: relative;
        overflow: hidden !important;
    }

    .search-data li:first-child {
        border-top: none; /* Remove the top border from the first li */
    }
    .featured_label{
        float: right;
        margin: -2px -48px 0 0;
        background-color: #E86121;
        color: #fff;
        padding: 0 40px;
        font-size: 13px;
        top: 0;
        right: 0;
        transform: rotate(40deg);
    }
    @media (max-width: 767px) {
        .product-price{
            font-size: 13px;
        }
        .search-details p{
            font-size: 14px;
        }
    }
    @media (max-width: 575px) {
        .search-img img {
            max-width: 100%;
        }
        .search-price{
            position: relative;
        }
        .search-img{
            width: 15%;
        }
        .search-details{
            width: 40%;
        }
        .search-price{
            width: 40%;
        }
        .featured_label{
            display: none;
        }
    }
    @media (max-width: 450px) {
        .search-img{
            width: 20%;
        }
        .search-details{
            width: 50%;
        }
        .search-price{
            width: 30%;
        }
        .search-price del{
            display: none;
        }
        .featured_label{
            margin: 0;
            position: absolute;
            top: 0;
            right: -37px;
        }
        
    }

</style>
