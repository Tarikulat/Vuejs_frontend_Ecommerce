
<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFlashDeal, useCart, useNotification, useShop } from '@/stores'
import { storeToRefs } from 'pinia';
import { CartSideBar, MobileMenu, BannerPart, ProductCard, ProductView } from '@/components';
import  BeatLoader  from 'vue-spinner/src/BeatLoader.vue';
import axiosInstance from "@/services/axiosService.js";
import VueMagnifier from '@websitebeaver/vue-magnifier'
import '@websitebeaver/vue-magnifier/styles.css'

// All Variable  Code Is Here.....................................................................................................
const flashDeal = useFlashDeal()
const { campaignProductById, campaignProduct, loading, campaignVariationProduct } = storeToRefs(flashDeal)
const route = useRoute();
const shop = useShop();

const cart = useCart();
const { loadings } = storeToRefs(cart);
const isloadings = ref(loadings);
const notify = useNotification();
const price = ref()
const isloading = ref(loading);
const color = 'white';
const size = '8px';
const quantityInput = ref(1);

const thumbnailImage = ref(null)
const activeImage = ref(0)
const images = ref([])

const productPrices = ref()
const selectedSize = ref();
const sizeID = ref();

const socialShares = ref('')

// related product start
const relatedProducts = ref();
const categoryId = ref([]);
// related product end

const changeImage = (img, index) => {
    thumbnailImage.value = img
    activeImage.value = index
}


const campaignProductByID = () => {
    flashDeal.campaignProductById(route.params.campaignId, route.params.productId)
}

function addToCart(tProduct) {
//   if (tProduct.offer_price != 0) {
//     price.value = tProduct.offer_price;
//   } else {
//     price.value = tProduct.mrp;
//   }
console.log(tProduct)
    if (tProduct.campaign_product_prices.length > 0) {        
        cart.addToCart({
          item_id: tProduct.id,
          name: tProduct.name,
          mrp: productPrices.value.mrp,
          offer_price: productPrices.value.offer_price,
          image: tProduct.image,
          size_id: productPrices.value.size_id,
          quantity: quantityInput.value,
          free_shipping:tProduct.free_shipping,
          campaign_id:tProduct.pivot.campaign_id,
        });
    } else {
        cart.addToCart({
          item_id: tProduct.id,
          name: tProduct.name,
          mrp: tProduct.pivot.mrp,
          offer_price: tProduct.pivot.offer_price,
          image: tProduct.image,
          quantity: quantityInput.value,
          free_shipping:tProduct.free_shipping,
          campaign_id:tProduct.pivot.campaign_id,
        });
    }


  notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
  
}


let matchedPrice = ref()

const sizeByPrice = async (sizeId, campaignId) => {
    console.log(sizeId, campaignId);
    try {
        const res = await axiosInstance.get(`/campaigns/products/${campaignId}/${route.params.productId}/${sizeId}`);
        selectedSize.value = sizeId
        productPrices.value = res.data.result
    } catch (error) {
        console.log(error);   
    }

}



const incrementCartItem = () => {
  if (sizeID.value !== null) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }
};
const decrementCartItem = () => {
  if (quantityInput.value != 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
};



// social media link  start



const socialMedia = async () => {
          try {
                const res = await axiosInstance.get('/social-medias');
                socialShares.value = res.data.result;                
            }catch (error) {
                console.log(error);
            }                 
       }


 const socialIcons = (socialType) =>{
      const iconMapping = {
        facebook: 'fab fa-facebook-f',
        twitter: 'fab fa-twitter', 
        whatsapp: "fab fa-whatsapp",
        messenger: "fab fa-facebook-messenger",
        linkedin: "fab fa-linkedin",
        instagram: "fab fa-instagram",
        phone: "fas fa-phone",
        
      };
      return iconMapping[socialType] || 'default-icon-class';
 }

 
 const socialURL = (socialType,socialUrl) =>{
      const iconMapping = {
        facebook: `https://www.facebook.com/${socialUrl}/`,
        twitter: `https://www.twitter.com/${socialUrl}/`, 
        whatsapp: `https://wa.me/+88${socialUrl}?text=Hello!`,
        messenger: `https://www.messenger.com/t/${socialUrl}/`,
        linkedin: `https://www.linkedin.com/${socialUrl}/`,
        instagram: `https://www.instagram.com/${socialUrl}/`,
        phone: `https://m.me/+88${socialUrl}`,
        
      };
      return iconMapping[socialType] || 'default-icon-class';
    }
    
    // social media link  end

      // Related product  start
      const getRelatedProductData = async(catId) => {
      let type = '';
      let brand = [];
      let price = [];
      let search = '';
      let paginateSize = 8;
      const res = await shop.getData(type, brand, catId, price, search, paginateSize);
      console.log(res.data);
      relatedProducts.value = res.data;
    }
    // watch(campaignProduct.value.category_id, (newValue, oldValue) => {
    //     console.log(campaignProduct.value.category_id);
    //     console.log(newValue);
    //     getRelatedProductData(newValue);
    // }, { deep: true });

    // Related product end

    categoryId.value.push(campaignProduct.value.category_id);


onMounted(() => {
    campaignProductByID()
    getRelatedProductData(categoryId.value)
    socialMedia();
     $(document).ready(function () {
      $('.venobox').venobox();
    });
})
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
        <BannerPart :title="campaignProduct.name" />
        <!--=====================================
                    BANNER PART END
        =======================================-->


         <!--=====================================
                  CART SIDEBAR PART START
        =======================================-->
         <CartSideBar />
    <!--=====================================
                    CART SIDEBAR PART END
        =======================================-->

        <!--=====================================
            PRODUCT VIEW START
        =======================================-->
        <ProductView />
    <!--=====================================
                    PRODUCT VIEW END
        =======================================-->


        <!--=====================================
                PRODUCT DETAILS PART START
        =======================================-->
        <section class="inner-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="details-gallery">
                             <!-- card left -->
                            <div class = "product-imgs">
                                <div class = "img-display">
                                    <div class = "img-showcase">
                                        <VueMagnifier :src="campaignProduct.image" width="100%" mgShape="square" height="auto" mgWidth="300" mgHeight="300" className="border-radius" alt="shoe image" v-if="thumbnailImage == null"/>
                                        <VueMagnifier :src="thumbnailImage" width="100%" height="auto" mgShape="square" mgWidth="300" mgHeight="300" alt="shoe image" v-else/>
                                    
                                    </div>
                                </div>
                                <div class = "img-select">
                                    <div class = "img-item" v-for="(img, index) in campaignProduct.images" :key="index" :class="[activeImage == index ? 'active-thumb' : '']">
                                        <img :src="img.image" alt = "shoe image" @click.prevent="changeImage(img.image, index)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="details-content">
                            <h3 class="details-name"><a href="#">{{ campaignProduct.name }}</a></h3>
                            <div class="details-meta">
                                <p>SKU:<span>1234567{{ campaignProduct.sku }}</span></p>
                                <p>BRAND:<a href="#">{{ campaignProduct.brand_id }}</a></p>
                            </div>
                            <template v-if="campaignVariationProduct.length > 0">
                                <h3 class="details-price" v-if="!productPrices">
                                    <span v-for="(productsPrice, index) in campaignVariationProduct" :key="index">
                                        <span v-if="productsPrice.pivot.is_default == 1"><del>{{$filters.currencySymbol(productsPrice.pivot.mrp)}}</del>
                                            <span>{{ $filters.currencySymbol(productsPrice.pivot.offer_price)}}<small>/per kilo</small></span>
                                        </span>
                                    </span>
                                </h3>
                                <h3 class="details-price" v-else>
                                        <span><del>{{$filters.currencySymbol(productPrices.mrp)}}</del>
                                        <span>{{ $filters.currencySymbol(productPrices.offer_price)}}<small>/per kilo</small></span></span>
                                </h3>
                            </template>
                            <template v-else>
                                <h3 class="details-price">
                                    <del>{{ campaignProduct.pivot.mrp }}</del>
                                    <span>{{ campaignProduct.pivot.offer_price }}<small>/per kilo</small></span>
                                </h3>
                            </template>
                            <div class="details-list-group">
                                <label class="details-list-title">Sizes:</label>
                                <ul class="details-tag-list">
                                    <li v-for="(size, index) in campaignProduct.campaign_product_prices" :key="index"><a href="#" @click.prevent="sizeByPrice(size.id, size.pivot.campaign_id)" :class="{ 'selectedSizeColor': size.id === selectedSize }">{{ size.name }}</a></li>
                                </ul>
                            </div> 
                            <p class="details-desc">{{ campaignProduct.short_description }}.</p>
                            <div class="details-list-group">
                                <label class="details-list-title">Share:</label>
                                <ul class="details-share-list">
                                    <li v-for="(socialShare, index) in socialShares" :key="index">
                                        <a :href="socialURL(socialShare.type, socialShare.contact)"  title=""><i :class="socialIcons(socialShare.type)"></i></a>
                                    </li>
                                </ul>
                            </div>
                            

                            <div class="details-add-group" v-if="campaignVariationProduct.length > 0">
                                    <div class="row">
                                    <span class="row d-block text-center text-danger" v-if="productPrices == null">Choose a Variations First then Click Add to Cart or Buy Now Button</span>
                                    <div class="col-md-6">
                                        <div class="quentyDefaultClass">
                                        <button class="action-minus" :disabled="productPrices == null ? true : false"
                                            @click.prevent="decrementCartItem" title="Quantity Minus">
                                            <i class="icofont-minus"></i>
                                        </button>
                                        <input class="action-input text-center" :class="selectedSize == null ? 'disabled' : ''"
                                            title="Quantity Number" type="text" name="quantity" v-model="quantityInput" />
                                        <button class="action-plus" :disabled="productPrices == null ? true : false"
                                            @click.prevent="incrementCartItem" title="Quantity Plus">
                                            <i class="icofont-plus"></i>
                                        </button>
                                        </div>
                                    </div>

                                    <div class="col-md-6" v-if="selectedSize != null">
                                        <button class="product-add" title="Add to Cart" @click.prevent="addToCart(campaignProduct)">
                                        <template v-if="isloading">
                                            <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
                                        </template>
                                        <template v-else><i class="fas fa-shopping-basket"></i></template>
                                        <span>কার্টে যোগ করুন</span>
                                        </button>
                                    </div>
                                    </div>
                                    <div class="row mt-3">
                                    <div class="col-md-6">
                                        <router-link :to="{ name: 'checkoutPage' }" class="product-add" title="Add to Cart" @click.prevent="addToCart(campaignProduct)">
                                        <i class="fas fa-shopping-basket"></i>
                                        <span>অর্ডার করুন</span>
                                        </router-link>
                                    </div>
                                    </div>
                            </div>
                            <div class="details-add-group" v-else>
                                <div class="row">
                                <div class="col-md-6">
                                    <div class="quentyDefaultClass">
                                    <button class="action-minus" @click.prevent="decrementCartItem" title="Quantity Minus">
                                        <i class="icofont-minus"></i>
                                    </button>
                                    <input class="action-input text-center" title="Quantity Number" type="text" name="quantity" v-model="quantityInput" />
                                    <button class="action-plus" @click.prevent="incrementCartItem" title="Quantity Plus">
                                        <i class="icofont-plus"></i>
                                    </button>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <button class="product-add" title="Add to Cart" @click.prevent="addToCart(campaignProduct)">
                                    <template v-if="isloading">
                                        <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
                                    </template>
                                    <template v-else><i class="fas fa-shopping-basket"></i></template>
                                    <span>কার্টে যোগ করুন</span>
                                    </button>
                                </div>
                                </div>
                                <div class="row mt-3">
                                <div class="col-md-6">
                                    <router-link :to="{ name: 'checkoutPage' }" class="product-add" title="Add to Cart" @click.prevent="addToCart(campaignProduct)">
                                    <i class="fas fa-shopping-basket"></i>
                                    <span>অর্ডার করুন</span>
                                    </router-link>
                                </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                PRODUCT DETAILS PART END
        =======================================-->


        <!--=====================================
                  PRODUCT TAB PART START
        =======================================-->
        <section class="inner-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-tabs">
                            <li><a href="#tab-desc" class="tab-link active" data-bs-toggle="tab">descriptions</a></li>
                            <li><a href="#tab-spec" class="tab-link" data-bs-toggle="tab">Specifications</a></li>
                        </ul>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="tab-desc">
                    <div class="row">
                        <div class="col-lg-6 order-lg-1 order-2">
                            <div class="product-details-frame">
                                <div class="tab-descrip">
                                    {{ campaignProduct.short_description }}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 order-lg-2 order-1">
                            <div class="product-details-frame">

                                <div class="tab-descrip">
                                    <img src="@/assets/images/video.jpg" alt="video">
                                    <a title="Product Video" href="https://youtu.be/9xzcVxSBbG8" class="venobox fas fa-play" data-autoplay="true" data-vbtype="video"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab-spec">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product-details-frame">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Product code</th>
                                            <td>SKU: 101783</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Category</th>
                                            <td>{{ campaignProduct.category }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Brand</th>
                                            <td>{{ campaignProduct.brand }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Type</th>
                                            <td>{{ campaignProduct.type }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    PRODUCT TAB PART END
        =======================================-->

        <!--=====================================
                 PRODUCT RELATED PART START
        =======================================-->
    <section class="inner-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>Related Products</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            <div class="col" v-for="(relatedProduct, index) in relatedProducts" :key="index">
            <ProductCard :product="relatedProduct" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <router-link :to="{ name:'shopPage', query:{ category: categoryId} }"  class="btn btn-outline">
                <i class="fas fa-eye"></i>
                <span>view all related</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=====================================
                 PRODUCT RELATED PART END
        =======================================-->

    </div>
</template>

<style scoped>
  @import "@/assets/css/product-details.css";

  .selectedSizeColor {
    color: white !important;
    background-color: #ff0000 !important;
    }

    img{
    width: 100%;
    display: block;
}
.img-display{
    overflow: hidden;
}
.img-showcase{
    display: flex;
    width: 100%;
    transition: all 0.5s ease;
}
.img-showcase img{
    min-width: 100%;
}
.img-select{
    display: flex;
}
.img-item{
    margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3){
    margin-right: 0;
}
.img-item:hover{
    opacity: 0.8;
}
.active-thumb{
  border: 2px solid #119744;
}

.disabled {
  background: #c48b8b !important;
}

.quentyDefaultClass {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quentyDefaultClass button {
  font-size: 28px;
}

.quentyDefaultClass input {
  margin: 0px 8px;
  border-radius: 5px;
}

@media (max-width: 425px) {
  .quentyDefaultClass {
    margin: 16px 0px;
  }

  .quentyDefaultClass input {
    width: 260px;
  }
}

@media (max-width: 375px) {
  .quentyDefaultClass {
    margin: 16px 0px;
  }

  .quentyDefaultClass input {
    width: 200px;
  }
}

@media (max-width: 320px) {
  .quentyDefaultClass {
    margin: 16px 0px;
  }

  .quentyDefaultClass input {
    width: 150px;
  }
}

</style>



