<script setup>
import { onMounted, ref } from "vue";
import { useOrder, useStatus } from "@/stores";
import { storeToRefs } from "pinia";
import { CategorySideBar, CartSideBar, NavSideBar, MobileMenu, } from '@/components'

const statu = useStatus()
const statuses = ref()
const order = useOrder()
const {orderLists} = storeToRefs(order)
const isOpen = ref(false);
const orderId = ref();

const getStatuses = async() => {
    statuses.value = await statu.getStatus();
}


const toggleOrderList = (index) => {
    isOpen.value = !isOpen.value;
    orderId.value = index;
    getStatuses();
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

onMounted(() => {
    order.getOrderList();
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

       <!--=====================================
                    ORDERLIST PART START
        =======================================-->
        <section class="inner-section orderlist-part mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="orderlist-filter">
                            <h5>total order <span>- ({{ orderLists?.result?.total }})</span></h5>
                            <div class="filter-short">
                                <label class="form-label">short by:</label>
                                <select class="form-select">
                                    <option value="all" selected>all order</option>
                                    <option value="recieved">recieved order</option>
                                    <option value="processed">processed order</option>
                                    <option value="shipped">shipped order</option>
                                    <option value="delivered">delivered order</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="orderlist" v-for="(orderList, index) in orderLists?.result?.data" :key="index">
                            <div class="orderlist-head" @click.prevent="toggleOrderList(index)">
                                <h5>order#{{ index+1 }}</h5>
                                <h5>order {{ orderList.current_status.name }}</h5>
                            </div>
                        <Transition>
                            <div class="orderlist-body" v-show="isOpen && orderId == index">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="order-track">
                                            <ul class="order-track-list">
                                                <li class="order-track-item" :class="status.id <= orderList.current_status.id ? 'active' : ''" v-for="(status, index) in statuses?.data" :key="index">
                                                    <i class="icofont-check"></i>
                                                    <span>{{ status.name }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <ul class="orderlist-details">
                                            <li>
                                                <h6>order id</h6>
                                                <p>{{ orderList.id }}</p>
                                            </li>
                                            <li>
                                                <h6>Name</h6>
                                                <p>{{ orderList.customer_name }}</p>
                                            </li>
                                            <li>
                                                <h6>Phone</h6>
                                                <p>{{ orderList.phone_number }}</p>
                                            </li>
                                            <li>
                                                <h6>Order Time</h6>
                                                <p>{{ formattedDate(orderList.created_at) }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-4">
                                        <ul class="orderlist-details">
                                            <li>
                                                <h6>Sub Total</h6>
                                                <p>{{ $filters.currencySymbol(orderList.mrp ? orderList.mrp : orderList.offer_price) }}</p>
                                            </li>
                                            <li>
                                                <h6>discount</h6>
                                                <p>{{ $filters.currencySymbol(orderList.discount) }}</p>
                                            </li>
                                            <li>
                                                <h6>delivery fee</h6>
                                                <p>{{ $filters.currencySymbol(orderList.delivery_charge) }}</p>
                                            </li>
                                            <li>
                                                <h6>Total<small>(Incl. VAT)</small></h6>
                                                <p>{{ $filters.currencySymbol(orderList.payable_price) }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="orderlist-deliver">
                                            <h6>Delivery location</h6>
                                            <p>{{ orderList.address_details }}</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="table-scroll">
                                            <table class="table-list">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Serial</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">quantity</th>
                                                        <th scope="col">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in orderList.items" :key="index">
                                                        <td class="table-serial"><h6>{{ index+1 }}</h6></td>
                                                        <td class="table-image"><img :src="item.image" alt="product"></td>
                                                        <td class="table-name"><h6>{{ item.name }}</h6></td>
                                                        <template v-if="item.pivot.size_id">
                                                            <td class="table-price"><h6>{{ $filters.currencySymbol(item.pivot.item_mrp ? item.pivot.item_mrp : item.pivot.item_sell_price) }}</h6></td>
                                                        </template>
                                                        <template v-else>
                                                            <td class="table-price"><h6>{{ $filters.currencySymbol(item.mrp ? item.mrp : item.offer_price) }}</h6></td>
                                                        </template>
                                                        <td class="table-quantity"><h6>{{ item.pivot.quantity }}</h6></td>
                                                        <td class="table-quantity"><h6>{{ (item.pivot.item_mrp ? item.pivot.item_mrp : item.pivot.item_sell_price) * item.pivot.quantity }}</h6></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    ORDERLIST PART END
        =======================================-->
    </div>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>