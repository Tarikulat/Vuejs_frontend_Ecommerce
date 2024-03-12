<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCart, useNotification, useAuth, useModal } from "@/stores";
import axiosInstance from "@/services/axiosService.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

// All Variable  Code Is Here.....................................................................................................
const modal =  useModal()
const auth = useAuth();
const cart = useCart();
const { loading } = storeToRefs(cart);
const notify = useNotification();
const isloading = ref(loading);
const color = "white";
const size = "8px";
const quantityInput = ref(1);
const props = defineProps({
  product: Object,
  types: String,
  product_prices: Number,
  required: true,
});

const price         = ref();
const route         = useRoute();
const router         = useRouter();

const sizeMrp = ref();
const sizeOfferPrice = ref();
const sizeId        = ref();
const productPrices = ref();
const sizeName      = ref();
const selectedSize  = ref();


const isButtonDisabled = ref(true);

function addToCart(tProduct) {
  if (tProduct.offer_price != 0) {
    price.value = tProduct.offer_price;
  } else {
    price.value = tProduct.mrp;
  }

  if(sizeMrp.value || sizeOfferPrice.value){

    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: sizeMrp.value,
      offer_price: sizeOfferPrice.value,
      image: tProduct.image,
      size_id: sizeId.value,
      quantity: 1,
      free_shipping: tProduct.free_shipping,
    });
    
  }else{
    
    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: tProduct.mrp,
      offer_price: tProduct.offer_price,
      image: tProduct.image,
      size_id: '',
      quantity: quantityInput.value,
      free_shipping: tProduct.free_shipping,
    });

  }


  notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
}

// sizes start

const sizeByPrice = (mrp, offerPrice, sizeID) => {
  console.log(sizeID);
  sizeMrp.value        = mrp;
  sizeOfferPrice.value = offerPrice;
  sizeId.value         = sizeID;
  isButtonDisabled.value = false;
}

// sizes end

// auth login part start 
const isLogin = (product) => {
  if (Object.keys(auth.user).length > 0) {
    addToCart(product)
    router.push({ name: "checkoutPage" });
  }else{
    // $("#login-modal").modal("show")
    modal.toggleModal();
    addToCart(product)
  }

}
// auth login part end

onMounted(() => {
  $(document).ready(function () {
    $(".venobox").venobox();
  });


});
</script>

<template>
  <div>
    <div class="product-card">
      <div class="product-media">
        <div class="product-label">
          <label class="label-text off">-{{ product.offer_percent }}%</label>
          <label class="label-text" :class="product.type === 'feature-product'
              ? 'feat'
              : product.type === 'top-product'
                ? 'sale'
                : product.type === 'recent-product'
                  ? 'new'
                  : ''
            ">{{ product.type }}</label>
        </div>
        <router-link :to="{name: 'productDetailsPage',params: { id: product.id, slug: product.slug },}" class="product-image">
          <img :src="product.image ? product.image : 'http://127.0.0.1:8000/images/default.png'"/>
        </router-link>
        <div class="product-widget" v-show="product.video_url">
          <a title="Product Video" :href="product.video_url" class="venobox fas fa-play" data-vbtype="video"
            data-autoplay="true"></a>
        </div>
      </div>
      <div class="product-content">
        <h6 class="product-name">
          <router-link :to="{
            name: 'productDetailsPage',
            params: { id: product.id, slug: product.slug },
          }">{{ product.name }}</router-link>
        </h6>
        <h6 class="product-price" v-if="product.product_prices.length > 0">
          <template v-if="sizeOfferPrice == 0">
            <span>{{ sizeMrp }}</span>
          </template>
          <template v-else>
            <del>{{ sizeMrp }}</del>
            <span>{{ sizeOfferPrice }}</span>
          </template>
        </h6>


        <h6 class="product-price" v-else>
          <span v-html="$filters.productPrice(product)"></span>
        </h6>

        <span class="text-danger" v-if="isButtonDisabled===true && product.product_prices.length > 0">প্রথমে ওয়েট সিলেক্ট করুন</span>

        <div class="details-list-group  mb-3" v-show="product.product_prices.length > 0">
          <label class="details-list-title ">Weight:</label>
          <ul class="details-tag-list text-center" >
            <li v-for="(size, index) in product.product_prices" :key="index" id="main">
              <a  href="#" :class="{selectedSizeColor: size.pivot.size_id === sizeId,}" @click.prevent="sizeByPrice(size.pivot.mrp, size.pivot.offer_price, size.pivot.size_id)">{{ size.name }}</a>
            </li>
          </ul>
        </div> 
        
        <template v-if="product.product_prices.length > 0">
          <div class="row">
            <div class="col-md-6">
              <button  class="product-add btnColorOrder" :disabled="isButtonDisabled" title="Add to Cart" @click.prevent="addToCart(product)">
                <template v-if="cart.loading === product.id">
                  <pulse-loader :loading="isloading" :color="color" :size="size"></pulse-loader>
                </template>
                <template v-else>
                  <i class="fas fa-shopping-cart"></i>
                </template>
                <span>কার্ট করুন</span>
              </button>
            </div>
            <div class="col-md-6">
              <a title="Product View" href="#"  class="product-add standard-wishs" :class="isButtonDisabled ? 'disabled btn border-danger' : ''"  @click.prevent="isLogin(product)">
                <i class="fas fa-shopping-basket"></i>
                <span>অর্ডার করুন</span>
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col-md-6">
              <button  class="product-add btnColorOrder"  title="Add to Cart" @click.prevent="addToCart(product)">
                <template v-if="cart.loading === product.id">
                  <pulse-loader :loading="isloading" :color="color" :size="size"></pulse-loader>
                </template>
                <template v-else>
                  <i class="fas fa-shopping-cart"></i>
                </template>
                <span>কার্ট করুন</span>
              </button>
            </div>
            <div class="col-md-6">
              <!-- <router-link :to="{ name: 'checkoutPage' }"  @click.prevent="addToCart(product)">
                <i class="fas fa-shopping-basket"></i>
                <span>অর্ডার করুন</span>
              </router-link> -->
              <a title="Product View" href="#" class="product-add standard-wishs " @click.prevent="isLogin(product)">
                <i class="fas fa-shopping-basket"></i>
                <span>অর্ডার করুন</span>
              </a>
            </div>
          </div>
        </template>

        <!-- </template> -->
        <!-- <div class="product-action">
          <button class="action-minus" title="Quantity Minus">
            <i class="icofont-minus"></i>
          </button>
          <input
            class="action-input"
            title="Quantity Number"
            type="text"
            name="quantity"
            value="1"
          />
          <button class="action-plus" title="Quantity Plus">
            <i class="icofont-plus"></i>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* product variation start */

.details-list-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  margin-bottom: 25px;
}


.details-list-group label{
  margin-right: 20px;
}

.details-list-group:last-child {
  margin-bottom: 0px;
}

.details-tag-list {
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


.details-tag-list li {
  margin-right: 8px;
}

.details-tag-list li a {
  font-size: 14px;
  line-height: 12px;
  padding: 8px 10px;
  border-radius: 5px;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  color: var(--text);
  background: var(--chalk);
  transition: all linear .3s;
  -webkit-transition: all linear .3s;
  -moz-transition: all linear .3s;
  -ms-transition: all linear .3s;
  -o-transition: all linear .3s;
}

.details-tag-list li a:hover {
  color: var(--white);
  background: var(--primary);
}

.selectedSizeColor {
  color: white !important;
  background-color: #ff0000 !important;
}

.btnColorOrder{
  background-color: #000000 !important;
  color: #fff !important;
}

.product-card:hover .btnColorOrder{
  background-color: #e8e8e8 !important;
  color: #000000 !important;
}
/* product variation end */

@media (max-width: 576px) {
  .standard-wishs {
    margin-top: 8px;
  }
}


</style>
