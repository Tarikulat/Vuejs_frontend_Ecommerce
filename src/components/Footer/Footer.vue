<script setup>
// All Import File  Code Is Here......................................................................................................
import { onMounted, ref } from "vue";
import { useSetting } from '@/stores'

// All Variable  Code Is Here.....................................................................................................
const setting = useSetting();

const settings = ref()

const logo = ref()
const description = ref()
const quickLinks = ref()
const contactUs = ref()
// API Calling Code Is Here.....................................................................................................




const getSetingInfo = async() => {
    settings.value = await setting.getData()
    logo.value = settings.value.data.filter(data => data.key == 'footer_logo')
    description.value = settings.value.data.filter(data => data.key == 'description')
    contactUs.value = settings.value.data.filter(data => data.key == 'contact_us')
    quickLinks.value = settings.value.data.filter(data => data.key == 'quick_links')
  }


  




// All Function  Code Is Here.....................................................................................................

onMounted(() => {
    getSetingInfo()
})
</script>
<template>
  <div>
 <footer class="footer-part">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <router-link :to="{ name: 'homePage'}" class="footer-logo" href="#" v-if="logo">
                <img :src="logo[0]?.logo" alt="logo" />
              </router-link>
              <p class="footer-desc" v-if="description">{{ description[0]?.description }}</p>
              <ul class="footer-social" v-if="quickLinks">
                <li><a class="icofont-facebook" href="#"></a></li>
                <li><a class="icofont-twitter" href="#"></a></li>
                <li><a class="icofont-linkedin" href="#"></a></li>
                <li><a class="icofont-instagram" href="#"></a></li>
                <li><a class="icofont-pinterest" href="#"></a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget contact">
              <h3 class="footer-title">contact us</h3>
              <ul class="footer-contact" v-if="contactUs">
                <li v-for="(contact, index) in contactUs" :key="index">
                  <i class="icofont-ui-email"></i>
                  <p>
                    <span><a :href="contact.url" class="text-dark">{{ contact.value }}</a></span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">Quick Links</h3>
              <div class="footer-links">
                <ul>
                  <li v-for="(quickLink, index) in quickLinks" :key="index">
                    <a :href="quickLink.url" class="icons me-2" target="_blank" v-html="quickLink.url"></a>
                    <a :href="quickLink.url" target="_blank">{{ quickLink.value }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">Download App</h3>
              <p class="footer-desc" v-if="description">{{ description[1]?.description }}</p>
              <div class="footer-app">
                <a href="#"
                  ><img src="@/assets/images/google-store.png" alt="google"
                /></a>
                <a href="#"><img src="@/assets/images/app-store.png" alt="app" /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="footer-bottom">
              <p class="footer-copytext">
                &copy; All Copyrights Reserved by
                <a
                  target="_blank"
                  href="https://servicekey.io/"
                  >ServiceKey</a
                >
              </p>
              <div class="footer-card">
                <a href="#"
                  ><img src="@/assets/images/payment/jpg/01.jpg" alt="payment"
                /></a>
                <a href="#"
                  ><img src="@/assets/images/payment/jpg/02.jpg" alt="payment"
                /></a>
                <a href="#"
                  ><img src="@/assets/images/payment/jpg/03.jpg" alt="payment"
                /></a>
                <a href="#"
                  ><img src="@/assets/images/payment/jpg/04.jpg" alt="payment"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  </div>
</template>

<style>

.icons{
  font-size: 20px;
}
</style>
