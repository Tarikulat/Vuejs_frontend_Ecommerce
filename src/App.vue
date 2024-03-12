<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { TopHeader, Navbar,  Footer,  Newsletter,  } from '@/components'
import { ref } from "vue";


const isOpenChat = ref('');

// const getSocialContact = async() =>{
//     const res = await socialContact.getSocialContacts();
//     if(res.success){
//         contactInfo.value = res.result;
//     }
// }

const chatOpen = () =>{
  isOpenChat.value = !isOpenChat.value
}

// const connectWhatsApp = (whatsappNumber) =>{
//   const phoneNumber = whatsappNumber;
//   const whatsappLink = https://wa.me/${phoneNumber};
//   window.open(whatsappLink, "_blank");
// }

// const connectPhone = (number) =>{
//   const phoneNumber = number;
//   const phoneLink = tel:${phoneNumber};
//   window.location.href = phoneLink;
// }
// const connectMessenger = (messengerUsername) =>{

//   const messengerLink = https://www.facebook.com/messages/t/${messengerUsername}; // Replace with your actual username or user ID
//   window.open(messengerLink, "_blank");

// }


// something tested 

</script>

<template>
  <div>

    <!-- <div class="backdrop"></div> -->
      <!-- <a class="backtop fas fa-arrow-up" href="#"></a> -->

      <!-- <div class="floating-container">
        <div class="floating-button"><i class="fas fa-comment-dots"></i></div>
        <div class="element-container">
          <a :href="`https://www.messenger.com/t/ImAlbab/`" target="_blank"><span class="float-element messenger"><i class="fab fa-facebook-messenger"></i></span></a>
          <a :href="`https://wa.me/+8801686381998?text=Hello!`" target="_blank"><span class="float-element whatsapp"><i class="fab fa-whatsapp"></i></span></a>
        </div>
      </div> -->

      <div class="social-contact">
        <ul class="chat-item" :class="{ 'openChatItems' : isOpenChat }">
            <li class="phone" ><i class="fa-solid fa-phone"></i></li>
            <li class="whatsapp" ><i class="fa-brands fa-whatsapp"></i></li>
            <li class="messenger"><i class="fa-brands fa-facebook-messenger"></i></li>
        </ul>
      <div class="message-icon" @click.prevent="chatOpen">
        <i class="fa-solid fa-xmark text-light" style="font-size: 20px;width:100%;" v-if="isOpenChat"></i>
        <i class="fa-regular fa-comment-dots text-light" style="font-size: 20px;width:100%;" v-else></i>
      </div>
      <div class="chat-text">
        Live Chat
      </div>
    </div>

    <!--=====================================
                    HEADER PART START
        =======================================-->
      <TopHeader />
    <!--=====================================
                    HEADER PART END
        =======================================-->

    <!--=====================================
                    NAVBAR PART START
        =======================================-->
    <Navbar />
    <!--=====================================
                    NAVBAR PART END
        =======================================-->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    

    <!--=====================================
                     FOOTER PART START
        =======================================-->
    <Footer />
    <!--=====================================
                      FOOTER PART END
        =======================================-->
  </div>
</template>

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


  @-webkit-keyframes come-in {
    0% {
      -webkit-transform: translatey(100px);
              transform: translatey(100px);
      opacity: 0;
    }
    30% {
      -webkit-transform: translateX(-50px) scale(0.4);
              transform: translateX(-50px) scale(0.4);
    }
    70% {
      -webkit-transform: translateX(0px) scale(1.2);
              transform: translateX(0px) scale(1.2);
    }
    100% {
      -webkit-transform: translatey(0px) scale(1);
              transform: translatey(0px) scale(1);
      opacity: 1;
    }
  }
@keyframes come-in {
  0% {
    -webkit-transform: translatey(100px);
            transform: translatey(100px);
    opacity: 0;
  }
  30% {
    -webkit-transform: translateX(-50px) scale(0.4);
            transform: translateX(-50px) scale(0.4);
  }
  70% {
    -webkit-transform: translateX(0px) scale(1.2);
            transform: translateX(0px) scale(1.2);
  }
  100% {
    -webkit-transform: translatey(0px) scale(1);
            transform: translatey(0px) scale(1);
    opacity: 1;
  }
}

.floating-container {
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  margin: 35px 25px;
  z-index: 99999;
}
.floating-container:hover {
  height: 195px;
}
.floating-container:hover .floating-button {
  box-shadow: 0 10px 25px rgba(44, 179, 240, 0.6);
  -webkit-transform: translatey(5px);
          transform: translatey(5px);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.floating-container:hover .element-container .float-element:nth-child(1) {
  -webkit-animation: come-in 0.4s forwards 0.2s;
          animation: come-in 0.4s forwards 0.2s;
}
.floating-container:hover .element-container .float-element:nth-child(2) {
  -webkit-animation: come-in 0.4s forwards 0.4s;
          animation: come-in 0.4s forwards 0.4s;
}
.floating-container:hover .element-container .float-element:nth-child(3) {
  -webkit-animation: come-in 0.4s forwards 0.6s;
          animation: come-in 0.4s forwards 0.6s;
}
.floating-container .floating-button {
  position: absolute;
  width: 47px;
  height: 47px;
  background: #ff0000;
  bottom: 0;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  line-height: 47px;
  text-align: center;
  font-size: 25px;
  z-index: 100;
  box-shadow: 0 10px 25px -5px rgba(44, 179, 240, 0.6);
  cursor: pointer;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.floating-container .float-element {
  position: relative;
  display: block;
  border-radius: 50%;
  width: 43px;
  height: 43px;
  margin: 15px auto;
  color: white;
  font-weight: 500;
  text-align: center;
  line-height: 52px;
  z-index: 0;
  opacity: 0;
  -webkit-transform: translateY(100px);
          transform: translateY(100px);
}

.float-element i {
  font-size: 27px;
}

.floating-container .float-element .material-icons {
  vertical-align: middle;
  font-size: 26px;
}
.floating-container .whatsapp {
  background: linear-gradient(45deg, #075e54, #128c7e, #25d366, #dcf8c6);
  box-shadow: 0 20px 20px -10px rgba(76, 175, 80, 0.5);
}

.floating-container .messenger {
  background:  linear-gradient(45deg, #FF6968, #A334FA, #0695FF);
  box-shadow: 0 20px 20px -10px rgba(66, 165, 245, 0.5);
}

.element-container a {
  display: inline;
}


@media (max-width: 768px) {
  .floating-container {
    width: 63px;
    bottom: 26px;
    right: 0px;
    z-index: 999;
  }

  .floating-container:hover {
    height: 181px;
}

  .floating-container .floating-button {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 23px;
}
}
@media (max-width: 425px) {
  .floating-container {
    width: 63px;
    bottom: 26px;
    right: 0px;
    z-index: 999;
  }

  .floating-container:hover {
    height: 178px;
}

  .floating-container .floating-button {
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 23px;
}
}

@media (max-width: 375px) {
  .floating-container {
    width: 63px;
    bottom: 26px;
    right: 0px;
    z-index: 999;
  }

  .floating-container .floating-button {
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 23px;
}
}

@media (max-width: 320px) {
  .floating-container {
    width: 63px;
    bottom: 26px;
    right: 0px;
    z-index: 999;
  }

  .floating-container .floating-button {
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 23px;
}
}


/* ............................................. */

.chat-item{
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 9;
    transition: 0.5s;
}
.openChatItems li{
  position: relative;
  transition: 0.5s;
}
.openChatItems li:nth-child(1) {
  margin-bottom: 60px;
}

.openChatItems li:nth-child(2) {
  margin-bottom: 120px;
}
.openChatItems li:nth-child(3) {
  margin-bottom: 180px;
}
.openChatItems li:nth-child(4) {
  margin-bottom: 240px;
}
.chat-item li{
  list-style: none;
  width: 50px;
  height: 50px;
  line-height: 55px;
  text-align: center;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  transition: 0.5s;
}
.phone,
.whatsapp{
  background-color: #02B43C;
}
.messenger{
  background-color: #01A0F7;
}
.chat-item li i{
  font-size: 24px;
}
.opacity{
  opacity: 0;
  transition: 0.5s;
}
.web-setting .setting-icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #ff0015;
    position: fixed;
    top: 30%;
    right: 0;
    z-index: 99;
    cursor: pointer;
    transition: 0.5s;
}
.social-contact .message-icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #ff0015;
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 99;
    cursor: pointer;
    transition: 0.5s;
    border-radius: 100%;
    border: 2px solid #fff;
}
.social-contact .chat-text{
    position: fixed;
    bottom: 30px;
    right: 40px;
    z-index: 99;
    font-weight: 700;
    color: #ff0000;
}


</style>
