<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCart } from "@/stores";
// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { cartItemCount, cartItem, totalPrice } = storeToRefs(cart);

// coupon 
const showCouponForm  = ref(false);
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
// coupon 

const toggleCouponForm = () => {
  showCouponForm.value = !showCouponForm.value;
}


$(".header-cart, .cart-btn").on("click", function () {
  $("body").css("overflow", "hidden");
  $(".cart-sidebar").addClass("active");
  $(".cart-close").on("click", function () {
    $("body").css("overflow", "inherit");
    $(".cart-sidebar").removeClass("active");
    $(".backdrop").fadeOut();
  });
});

function cartClose() {
  $("body").css("overflow", "inherit"),
    $(".cart-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
}

const deleteCart = (index) => {
  cart.destroy(index);
};

const cartDecrement = (index) => {
  cart.decrement(index);
};

const cartIncrement = (index) => {
  cart.increment(index);
};
</script>

<template lang="">
  <div>
    <aside class="cart-sidebar">
      <div class="cart-header">
        <div class="cart-total" v-if="cartItemCount !== 0">
          <i class="fas fa-shopping-basket"></i>
          <span>total item ({{ cartItemCount }})</span>
        </div>
        <div class="cart-total" v-else>
          <i class="fas fa-shopping-basket"></i>
          <span>আপনার কার্টে কিছু নেই</span>
        </div>
        <button class="cart-close"><i class="icofont-close"></i></button>
      </div>
      <Transition name="fade" mode="out-in">
        <TransitionGroup
          name="list"
          tag="ul"
          class="cart-list"
          v-if="cartItemCount !== 0"
        >
          <li
            class="cart-item"
            v-for="(cart, index) in cartItem"
            :key="index"
          >
            <div class="cart-media">
              <a href="#"> <img :src="cart.image" alt="product" /></a>
              <button class="cart-delete" @click.prevent="deleteCart(index)">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="cart-info-group">
              <div class="cart-info">
                <h6>
                  <a href="product-single.html">{{ cart.name }}</a>
                </h6>
                <p>
                  Unit Price -
                  <!-- {{ $filters.currencySymbol(cart.offer_price) }} -->
                  <!-- {{ $filters.currencySymbol(cart.price) }} -->
                  <span v-html="$filters.productPrice(cart)"></span>
                </p>
              </div>
              <div class="cart-action-group">
                <div class="product-action">
                  <button
                    class="action-minus"
                    title="Quantity Minus"
                    @click.prevent="cartDecrement(index)"
                  >
                    <i class="icofont-minus"></i>
                  </button>
                  <input
                    class="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    :disabled="cart.quantity === 1 ? true : false"
                    :value="cart.quantity"
                  />
                  <button
                    class="action-plus"
                    title="Quantity Plus"
                    @click.prevent="cartIncrement(index)"
                  >
                    <i class="icofont-plus"></i>
                  </button>
                </div>
                <h6>
                  {{ $filters.currencySymbol(Math.round((cart.offer_price <= 0 ? cart.mrp : cart.offer_price) * cart.quantity)) }}
                </h6>
              </div>
            </div>
          </li>
        </TransitionGroup>
        <ul class="cart-list" v-else>
          <li class="cart-item cartItemImage">
            <img src="@/assets/images/cart/cart.png" alt="" />
          </li>
          <h3 class="text-danger text-center">আপনার কার্টে কিছু নেই</h3>
        </ul>
      </Transition>
      <!-- <div class="cart-footer" v-if="cartItemCount">
        <router-link class="cart-checkout-btn" :to="{ name: 'checkoutPage' }">
          <span class="checkout-label">Proceed to Checkout</span>
          <span class="checkout-price">{{ $filters.currencySymbol(totalPrice)}}</span>
        </router-link>
      </div> -->

      <div class="coupon-btn text-center">
          <button class="coupon-btn" @click.prevent="toggleCouponForm()">Do you have a coupon code?</button>
          <form class="coupon-form" v-if="showCouponForm">
              <input type="text" placeholder="Enter your coupon code">
              <button type="submit"><span>apply</span></button> 
          </form>
      </div>

      <div class="cart-footer" v-if="cartItemCount">
          <router-link :to="{name: 'checkoutPage'}" class="cart-checkout-btn" @click="cartClose">
              <span class="checkout-label" style="width: 60%;">অর্ডার করুন</span>
              <span class="checkout-price">{{ $filters.currencySymbol(totalPrice)}} tk</span>
          </router-link>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.cartItemImage {
  margin-top: 60px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
