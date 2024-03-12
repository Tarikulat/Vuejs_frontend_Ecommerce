<script setup>
// All Import File  Code Is Here......................................................................................................
import { useAuth, useNotification, useFlashDeal } from '@/stores';
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from 'pinia';

// All Variable  Code Is Here.....................................................................................................
const flashDeals = useFlashDeal()
const auth = useAuth()
const router = useRouter();
const {user, loading} =  storeToRefs(auth)
const {campaignProduct} =  storeToRefs(flashDeals)
const notify = useNotification();
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................

const logout = async () => {
    const res = await auth.logout();
    if (res.success) {
        router.push({ name: "homePage"});
        notify.Success("Logout Successfully Done");
    }
}
</script>

<template lang="">
  <div>
    <!--=====================================
                    NAVBAR PART START
        =======================================-->
        <nav class="navbar-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="navbar-content">
                            <ul class="navbar-list">
                                <li class="navbar-item dropdown">
                                    <router-link :to="{ name: 'homePage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'homePage' }">Home</router-link>
                                </li>
                                <li class="navbar-item dropdown-megamenu">
                                    <router-link :to="{ name: 'shopPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'shopPage' }">Shop</router-link>
                                </li>
                                <li class="navbar-item">
                                    <router-link :to="{ name: 'aboutPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'aboutPage' }">About Us</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'contactPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'contactPage' }">Contact Us</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'flashDealPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'flashDealPage' }">Flash Deal</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'campaignPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'campaignPage' }">Campaign Page</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'blogPage' }" class="navbar-link" :class="{ 'text-danger': $route.name === 'blogPage' }">Blog</router-link>
                                </li>
                                <li class="navbar-item dropdown">
                                    <a class="navbar-link dropdown-arrow" href="#">authentic</a>
                                    <ul class="dropdown-position-list" v-if="user.user">
                                        <li><router-link :to="{name: 'Profile'}">Profile</router-link></li>
                                        <li><router-link :to="{name: 'OrderList'}">My Order</router-link></li>
                                        <li ><a href="" @click.prevent="logout()">Logout<span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span></a></li>
                                    </ul>
                                    <ul class="dropdown-position-list" v-else>
                                        <li><router-link :to="{name:'Login'}">login</router-link></li>
                                        <li><router-link :to="{name: 'Registration'}">register</router-link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!--=====================================
                    NAVBAR PART END
        =======================================-->
  </div>
</template>

<style></style>
