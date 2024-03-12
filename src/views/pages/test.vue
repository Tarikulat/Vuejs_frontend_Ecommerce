<script setup>
import { CartSideBar, MobileMenu, BannerPart } from "@/components";
import axiosInstance from "@/services/axiosService.js";
import { useCart, useOrder } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// All Variable  Code Is Here.....................................................................................................

const cart = useCart();
const { cartItem, totalPrice, campaignId } = storeToRefs(cart);
const order = useOrder();
const { storeOrder } = storeToRefs(order);

const name = ref("");
const phoneNumber = ref("");
const district = ref("");
const address = ref("");
const payment_gateway_id = ref(1);
const delivery_gateway_id = ref();
const deliverCharge = ref();
const deliveryInfo = ref([]);
const payment_gateways = ref([]);

// coupon 
const showCouponForm  = ref(false);
const couponDiscountAmount  = ref();
const coupon = ref();
const couponErrorMessage = ref();
const couponId = ref();

const getDeliveryGateway = async () => {
  try {
    const res = await axiosInstance.get("/delivery-gateway");
    deliveryInfo.value = res.data.result;

    if (cartItem.value.some((item) => item.free_shipping === 1)) {
      delivery_gateway_id.value = 0;
      deliverCharge.value = 0;
    } else {
      delivery_gateway_id.value = res.data.result[0].id;
      deliverCharge.value = res.data.result[0].delivery_fee;
    }
  } catch (error) {
    console.log(error);
  }
};

const getDeliveryAmount = async () => {
  try {
    const res = await axiosInstance.get(
      `/delivery-gateway/price/${delivery_gateway_id.value}`
    );
    deliverCharge.value = res.data.result.delivery_fee;
  } catch (error) {
    console.log(error);
  }
};

const getPaymentGetway = async () => {
  try {
    const res = await axiosInstance.get(`/payment-gateway`);
    payment_gateways.value = res.data.result;
  } catch (error) { }
};


const placeOrder = () => {
  order.storeOrder({
    name: name.value,
    phoneNumber: phoneNumber.value,
    district: district.value,
    address: 'sdfsadf',
    items: cartItem.value,
    // campaign_id: campaignId.value,
    coupon_id: couponId.value,
    totalPrice: totalPrice.value,
    payment_gateway_id: payment_gateway_id.value,
    delivery_gateway_id: delivery_gateway_id.value == 0 ? null : delivery_gateway_id.value,
  });
};

// cart delete 

const deleteCart = (index) => {
  cart.destroy(index);
};

const cartIncrement = (index) => {
  cart.increment(index);
};

const cartDecrement = (index) => {
  cart.decrement(index);
};

// coupon 

const toggleCouponForm = () => {
  showCouponForm.value = !showCouponForm.value;
}
const couponCalculate = async() => {
  const res = await axiosInstance.get(`/coupons/check?coupon_code=${coupon.value}&cart_total_amount=${totalPrice.value}`); 
  couponErrorMessage.value = res.data.message 
  couponDiscountAmount.value = res.data.result.discount_amount;
  couponId.value = res.data.result.coupon_id;
}


onMounted(() => {
  getDeliveryGateway();
  getPaymentGetway();
});
</script>

<template>
  <div>
    <!--=====================================
                    MOBILE-MENU PART START
        =======================================-->
    <MobileMenu />
    <!--=====================================
                    MOBILE-MENU PART END
        =======================================-->

    <!--=====================================
                    BANNER PART START
        =======================================-->
    <BannerPart :title="'Checkout Page'" :sub_title="'Home'" />
    <!--=====================================
                    BANNER PART END
        =======================================-->

    <CartSideBar />

    <!--=====================================
                    CHECKOUT PART START
        =======================================-->
    

    <div class="container my-5">
        <div class="row">
            <div class="col-lg-8">
                <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quentity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in cartItem" :key="index">
                          <th scope="row">{{ 1 + index }}</th>
                          <td><a href="" class="img"><img :src="product.image" class="" alt=""></a></td>
                          <td class="text-wrap">{{ product.name }}</td>
                          <td>{{ Math.round(product.offer_price == 0 ? product.mrp : product.offer_price) }}</td>
                          <td class="w-25">
                            <div class="checkout-page-action">
                                <button
                                  class=""
                                  title="Quantity Minus"
                                  @click.prevent="cartDecrement(index)"
                                >
                                  <i class="icofont-minus"></i>
                                </button>
                                <input
                                  class=""
                                  title="Quantity Number"
                                  type="text"
                                  name="quantity"
                                  :disabled="product.quantity === 1 ? true : false"
                                  :value="product.quantity"
                                />
                                <button
                                  class=""
                                  title="Quantity Plus"
                                  @click.prevent="cartIncrement(index)"
                                >
                                  <i class="icofont-plus"></i>
                                </button>
                            </div>
                          </td>
                          <td>{{ (Math.round(product.offer_price == 0 ? product.mrp : product.offer_price)) * product.quantity }}</td>
                          <td>
                            <button class="cart-delete" @click.prevent="deleteCart(index)">
                              <i class="far fa-trash-alt text-danger"></i>
                            </button>
                          </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="left">
                    <h5 class="text-wrap text-center">অর্ডার কনফার্ম করতে আপনার নাম, মোবাইল নাম্বর, ঠিকানা লিখে অর্ডার করুন" বাটনে ক্লিক করুন।</h5>
                <form class="mt-3">
                    <div class="form-group">
                        <label for="exampleInputEmail1">নামঃ</label>
                        <input type="email" v-model="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="এখানে লিখুন.....">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">মোবাইল নম্বরঃ</label>
                        <input type="password" v-model="phoneNumber" class="form-control" id="exampleInputPassword1" placeholder="এখানে লিখুন.....">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">ঠিকানা</label>
                        <textarea v-model="address" class="form-control" id="exampleFormControlTextarea1" placeholder="এখানে লিখুন....." rows="3"></textarea>
                    </div>
                    <h6 class="delivary-charge text-center">ডেলিভারি চার্জ</h6>
                    <div class="form-check form-check-inline mt-3" v-for="(delivery, index) in deliveryInfo" :key="index">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                        <label class="form-check-label text-danger" for="inlineRadio1">{{ delivery.name }}</label>
                    </div>
                    <!-- <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                        <label class="form-check-label text-danger" for="inlineRadio2">ঢাকার বাহিরে ১২০ টাকা</label>
                    </div> -->
                </form>
                </div>
                <div class="secend-box border p-2 bg-light mt-3">
                    <div class="d-flex justify-content-between">
                      <div class="left-text"><h5 class="text-wrap">পেমেন্ট মেথড সিলেক্ট করুন</h5></div>
                      <div class="right-text"><i class="fa-solid fa-lock"></i>সম্পূর্ণ নিরাপদ পেমেন্ট</div>
                    </div>
                <form class="mt-3">
                  <div class="border p-2">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                      <label class="form-check-label" for="gridRadios2">
                        ক্যাশ অন ডেলিভারি করুন 
                      </label>
                    </div>
                  </div>
                  <div class="payment-text my-2"><i class="fa-solid fa-check"></i>পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন</div>
                  <div class="border p-2 d-flex justify-content-between">
                    <div class="form-check mt-1">
                        <input class="form-check-input mt-2" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                        <label class="form-check-label mt-1" for="gridRadios2">বিকাশ</label>
                    </div>
                    <div class="">
                      <img src="@/assets/images/payment/jpg/bkash.jpg" alt="">
                    </div>
                  </div>
                </form>
                </div>
                <div class="left mt-3">
                    <h5 class="text-wrap">Order Summery</h5>
                    <div class="d-flex justify-content-between my-2">
                      <p class="text-danger">Sub Total</p>
                      <p class="text-danger">{{ cart.totalPrice }} <span class="font-weight-bold">TK</span></p>
                    </div>
                    <div class="d-flex justify-content-between my-2">
                      <p class="text-danger">Delivary Charge</p>
                      <p class="text-danger">60 <span class="font-weight-bold">TK</span></p>
                    </div>
                    <div class="line"></div>
                    <div class="d-flex justify-content-between my-2">
                      <p class="text-danger">Total</p>
                      <p class="text-danger"><span class="flag-discount me-4">30% Save</span> {{ cart.totalPrice + 60}}  <span class="font-weight-bold">TK</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--=====================================
                    CHECKOUT PART END
        =======================================-->
  </div>
</template>


<style scope>
@import "@/assets/css/checkout.css";



.img{
    width: 50px;
}
.img img{
    border-radius: 0% !important;
}

.left{
    border: 1px solid #ff6868;
    padding: 15px;
   
  border-radius: 5px;
}

.delivary-charge {
    padding: 7px 0px;
    border: 1px solid black;
    color: red;
}
.left-text h5{
  font-weight: 800;
  font-size: 15px;
}

.line{
  border-bottom: 2px solid #ff0000;
}

.secend-box{
  box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-webkit-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-moz-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
  border-radius: 5px;
}

.right-text i {
  margin: 0px 5px;
  border: 1px solid rgb(255, 0, 0);
  padding: 5px;
  border-radius: 50%;
  background-color: red;
  color: white;
}
.payment-text i {
  border: 1px solid rgb(255, 0, 0);
  padding: 2px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
  margin-right: 6px;
}

.flag-discount {
    border-radius: 6px 0 0 6px;
    color: #fff;
    display: block;
    float: left;
    padding: 0px 5px;
    background: #ff0000;
    font-size: 15px;
    font-weight: 400;
    position: relative;
}
.flag-discount::before,
.flag-discount::after {
    content: "";
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-style: solid;
    display: block;
}
.flag-discount::before {
    top: 0;
    border-width: 22px 15px 0 0;
    border-color: #ff0000 transparent transparent transparent;
}
.flag-discount::after {
    bottom: 0;
    border-width: 0 15px 22px 0;
    border-color: transparent transparent #ff0000 transparent;
}


/* input quantity start */


.checkout-page-action{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.checkout-page-action button i {
  width: 35px;
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  color: var(--text);
  background: var(--chalk);
  text-shadow: var(--primary-tshadow);
  transition: all linear .3s;
  -webkit-transition: all linear .3s;
  -moz-transition: all linear .3s;
  -ms-transition: all linear .3s;
  -o-transition: all linear .3s;
}

.checkout-page-action button i:hover {
  color: var(--white);
  background: var(--primary);
}

.checkout-page-action input {
  width: 17% !important;
  font-size: 15px;
  margin: 0px 5px;
  padding: 6px 0px;
  border-radius: 6px;
  text-align: center;
  color: var(--white);
  background: var(--primary);
  text-shadow: var(--primary-tshadow);
}

/* input quantity end */

</style>