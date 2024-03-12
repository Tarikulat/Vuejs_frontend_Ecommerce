<script setup>
import { CartSideBar, MobileMenu, BannerPart } from "@/components";
import axiosInstance from "@/services/axiosService.js";
import { useCart, useOrder } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// All Variable  Code Is Here.....................................................................................................

const cart = useCart();
const { cartItem, totalPrice, campaignId } = storeToRefs(cart);
console.log(campaignId);
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
  } catch (error) {}
};

console.log(cartItem);
console.log(totalPrice);

const placeOrder = () => {
  order.storeOrder({
    name: name.value,
    phoneNumber: phoneNumber.value,
    district: district.value,
    address: address.value,
    items: cartItem.value,
    campaign_id: campaignId.value,
    totalPrice: totalPrice.value,
    payment_gateway_id: payment_gateway_id.value,
    delivery_gateway_id:
      delivery_gateway_id.value == 0 ? null : delivery_gateway_id.value,
  });
};

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

    <!--=====================================
                    CHECKOUT PART START
        =======================================-->

    <CartSideBar />

    <section class="inner-section checkout-part">
      <div class="container">
        <div class="row">
          <form action="" @submit.prevent="placeOrder">
            <div class="col-lg-12">
              <div class="account-card">
                <div class="account-title">
                  <h4>Delivery Schedule</h4>
                </div>
                <div class="account-content">
                  <div class="row">
                    <div class="col-md-4">
                      <label for="">Your Full Name</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Full-Name"
                        v-model="name"
                        required
                      />
                    </div>
                    <div class="col-md-4">
                      <label for="">Your Phone Number</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Phone Number"
                        v-model="phoneNumber"
                        required
                      />
                    </div>
                    <div class="col-md-4">
                      <label for="">Shipping Distric</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Your District"
                        v-model="district"
                        required
                      />
                    </div>
                    <div class="col-md-6 mt-2">
                      <label for="">Address</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="address"
                        required
                      />
                    </div>
                    <div class="col-md-3 mt-2">
                      <label for="">Shipping Area</label>

                      <select
                        class="form-control"
                        name=""
                        id=""
                        v-model="delivery_gateway_id"
                        @change="getDeliveryAmount"
                      >
                        <option value="0" v-if="delivery_gateway_id == 0">
                          Free Shipping
                        </option>
                        <option
                          v-for="(delivery, index) in deliveryInfo"
                          :key="index"
                          :value="delivery.id"
                        >
                          {{ delivery.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-3 mt-2">
                      <label for="">Payment method</label>
                      <select class="form-control" v-model="payment_gateway_id">
                        <option value="">Select Payment Option</option>
                        <option
                          v-for="(payment_gateway, index) in payment_gateways"
                          :key="index"
                          :value="payment_gateway.id"
                        >
                          {{ payment_gateway.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="account-card">
                <div class="account-title">
                  <h4>Your order</h4>
                </div>
                <div class="account-content">
                  <div class="table-scroll">
                    <table class="table-list">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in cartItem" :key="index">
                          <td class="table-image">
                            <img :src="product.image" alt="product" />
                          </td>
                          <td class="table-name">
                            <h6>{{ product.name }}</h6>
                          </td>
                          <td class="table-brand">
                            <h6>{{ product.price * product.quantity }}</h6>
                          </td>
                          <td class="table-quantity">
                            <h6>{{ product.quantity }}</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="chekout-coupon"></div>
                  <div class="checkout-charge">
                    <ul>
                      <li>
                        <span>Sub total</span>
                        <span>{{ totalPrice }}</span>
                      </li>
                      <li>
                        <span>Delivery Charge</span>
                        <span>${{ deliverCharge }}</span>
                      </li>
                      <li>
                        <span>Total<small>(Incl. VAT)</small></span>
                        <span
                          >{{
                            (
                              parseFloat(totalPrice) + parseFloat(deliverCharge)
                            ).toFixed(2)
                          }}
                          tk</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="checkout-proced">
              <button class="btn btn-inline">Place Order</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "@/assets/css/checkout.css";
</style>
