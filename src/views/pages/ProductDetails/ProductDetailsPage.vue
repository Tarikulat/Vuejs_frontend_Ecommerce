<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProduct, useCart, useNotification, useShop } from "@/stores";
import { storeToRefs } from "pinia";
import { CartSideBar, MobileMenu, BannerPart, ProductCard, ProductView } from "@/components";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import axiosInstance from "@/services/axiosService.js";
import VueMagnifier from "@websitebeaver/vue-magnifier";
import "@websitebeaver/vue-magnifier/styles.css";

// All Variable  Code Is Here.....................................................................................................
const product = useProduct();
const singleProduct = ref();
const { productById,  loading, productVariations } = storeToRefs(product);
const route = useRoute();
const shop = useShop();
const { products } = storeToRefs(shop);

const cart = useCart();
const { loadings } = storeToRefs(cart);
const isloadings = ref(loadings);
const notify = useNotification();
const price = ref();

const sizeId = ref();
const productPrices = ref();
const sizeName = ref();
const selectedSize = ref();

const isloading = ref(loading);
const color = "white";
const size = "8px";
const quantityInput = ref(1);
const categoryId = ref([]);


// social Icons start
const socialShares = ref("");
// social Icons end
// related product start
const relatedProducts = ref();
// related product end

const thumbnailImage = ref(null);
const activeImage = ref(0);
const images = ref([]);
const changeImage = (img, index) => {
  thumbnailImage.value = img;
  activeImage.value = index;
};

const productByid = async () => {
  const res = await product.productById(route.params.id);
  categoryId.value.push(res?.data?.category_id);
};

const getPrices = async (sizeI, name) => {
  try {
    const res = await axiosInstance.get(`/products/${route.params.id}/${sizeI}`);
    selectedSize.value = sizeI;
    productPrices.value = res.data.result;
  } catch (error) {
    console.log(error);
  }
  sizeName.value = name;
};

function addToCart(tProduct) {
  console.log(tProduct);

  if (productPrices.value) {
    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: productPrices.value.mrp,
      offer_price: productPrices.value.offer_price,
      image: tProduct.image,
      size_id: productPrices.value.size_id,
      quantity: quantityInput.value,
      free_shipping: tProduct.free_shipping,
    });

    notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
  } else {
    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: tProduct.mrp,
      offer_price: tProduct.offer_price,
      image: tProduct.image,
      size_id: "",
      quantity: quantityInput.value,
      free_shipping: tProduct.free_shipping,
    });

    notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
  }
}

const incrementCartItem = () => {
  if (sizeId.value !== null) {
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
    const res = await axiosInstance.get("/social-medias");
    socialShares.value = res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const socialIcons = (socialType) => {
  const iconMapping = {
    facebook: "fab fa-facebook-f",
    twitter: "fab fa-twitter",
    whatsapp: "fab fa-whatsapp",
    messenger: "fab fa-facebook-messenger",
    linkedin: "fab fa-linkedin",
    instagram: "fab fa-instagram",
    phone: "fas fa-phone",
  };
  return iconMapping[socialType] || "default-icon-class";
};

const socialURL = (socialType, socialUrl) => {
  const iconMapping = {
    facebook: `https://www.facebook.com/${socialUrl}/`,
    twitter: `https://www.twitter.com/${socialUrl}/`,
    whatsapp: `https://wa.me/+88${socialUrl}?text=Hello!`,
    messenger: `https://www.messenger.com/t/${socialUrl}/`,
    linkedin: `https://www.linkedin.com/${socialUrl}/`,
    instagram: `https://www.instagram.com/${socialUrl}/`,
    phone: `https://m.me/+88${socialUrl}`,
  };
  return iconMapping[socialType] || "default-icon-class";
};

// social media link  end

// Related product  start
const getRelatedProductData = async (catId) => {
  let type = "";
  let brand = [];
  let price = [];
  let search = "";
  let paginateSize = 8;
  const res = await shop.getData(type, brand, catId, price, search, paginateSize);
  relatedProducts.value = res.data;
};

// product changes function 

const productChangesFunction = async() => {
  singleProduct.value = await product.productById(route.params.id);
}
// product detials changes start
watch(() => route.params.id, (newValue, oldValue) => {
  productChangesFunction();
});
// product detials changes end
watch(
  categoryId,
  (newValue, oldValue) => {
    getRelatedProductData(newValue);
  },
  { deep: true }
);

// Related product end

onMounted(() => {
  productChangesFunction();
  productByid();
  socialMedia();
  getPrices();
  $(document).ready(function () {
    $(".venobox").venobox();
  });
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
    <BannerPart :title="singleProduct?.name" />
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
              <div class="details-label-group">
                <label class="details-label new">{{ singleProduct?.type }}</label>
                <label class="details-label off">{{ singleProduct?.discount }}%</label>
              </div>
              <!-- card left -->
              <div class="product-imgs">
                <div class="img-display">
                  <div class="img-showcase">
                    <!-- {{ singleProduct?.images }} -->

                    <VueMagnifier
                      :src="singleProduct?.image"
                      width="100%"
                      mgShape="square"
                      height="auto"
                      mgWidth="300"
                      mgHeight="300"
                      className="border-radius"
                      alt="shoe image"
                      v-if="thumbnailImage == null"
                    />
                    <VueMagnifier
                      :src="thumbnailImage"
                      width="100%"
                      height="auto"
                      mgShape="square"
                      mgWidth="300"
                      mgHeight="300"
                      alt="shoe image"
                      v-else
                    />

                    <!-- <img :src="singleProduct?.image" alt="shoe image" v-if="thumbnailImage == null" />
                    <img :src="thumbnailImage" alt="shoe image" v-else /> -->
                  </div>
                </div>
                <div class="img-select">
                  <div
                    class="img-item"
                    v-for="(img, index) in singleProduct?.images"
                    :key="index"
                    :class="[activeImage == index ? 'active-thumb' : '']"
                  >
                    <img
                      :src="img.image"
                      alt="shoe image"
                      @click.prevent="changeImage(img.image, index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="details-content">
              <h3 class="details-name">
                <a href="#">{{ singleProduct?.name }}</a>
              </h3>
              <div class="details-meta">
                <p>
                  SKU:<span>1234567{{ singleProduct?.sku }}</span>
                </p>
                <p>
                  BRAND:<a href="#">{{ singleProduct?.brand }}</a>
                </p>
              </div>
              <template v-if="singleProduct?.product_prices.length > 0">
                <h3 class="details-price" v-if="!productPrices">
                  <span v-for="(productsPrice, index) in singleProduct?.product_prices" :key="index">
                    <!-- {{ productsPrice }} -->
                    <span v-if="productsPrice.is_default == 1">
                      <span v-html="$filters.productPrice(productsPrice)"></span>
                    </span>
                  </span>
                </h3>
                <h3 class="details-price" v-else>
                  <span v-html="$filters.productPrice(productPrices)"></span>
                </h3>
              </template>
              <template v-else>
                <h3 class="details-price" v-if="singleProduct?.offer_price == 0">
                  <span>{{ singleProduct?.mrp }}</span>
                </h3>
                <h3 class="details-price" v-else>
                  <del>{{ singleProduct?.mrp }}</del> <span>{{ singleProduct?.offer_price }}</span>
                </h3>
              </template>
              <p class="details-desc">{{ singleProduct?.short_description }}.</p>
              <div class="details-list-group">
                <label class="details-list-title" v-show="singleProduct?.product_prices.length > 0"
                  >Sizes:</label
                >
                <ul class="details-tag-list">
                  <li v-for="(size, index) in singleProduct?.product_prices" :key="index" id="main">
                    <a
                      :class="{ selectedSizeColor: size.size_id === selectedSize }"
                      href="#"
                      @click="getPrices(size.size_id, size.name)"
                      >{{ size.name }}</a
                    >
                  </li>
                </ul>
              </div>
              <div class="details-list-group">
                <label class="details-list-title" v-show="socialShares.length > 0"
                  >Share:</label
                >
                <ul class="details-share-list">
                  <li v-for="(socialShare, index) in socialShares" :key="index">
                    <a :href="socialURL(socialShare.type, socialShare.contact)" title=""
                      ><i :class="socialIcons(socialShare.type)"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <div class="details-add-group" v-if="singleProduct?.product_prices.length > 0">
                <div class="row">
                  <span
                    class="row d-block text-center text-danger"
                    v-if="productPrices == null"
                    >Choose a Variations First then Click Add to Cart or Buy Now
                    Button</span
                  >
                  <div class="col-md-6">
                    <div class="quentyDefaultClass">
                      <button
                        class="action-minus"
                        :disabled="productPrices == null ? true : false"
                        @click.prevent="decrementCartItem"
                        title="Quantity Minus"
                      >
                        <i class="icofont-minus"></i>
                      </button>
                      <input
                        class="action-input text-center"
                        :class="selectedSize == null ? 'disabled' : ''"
                        title="Quantity Number"
                        type="text"
                        name="quantity"
                        v-model="quantityInput"
                      />
                      <button
                        class="action-plus"
                        :disabled="productPrices == null ? true : false"
                        @click.prevent="incrementCartItem"
                        title="Quantity Plus"
                      >
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div class="col-md-6" v-if="selectedSize != null">
                    <button
                      class="product-add"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct)"
                    >
                      <template v-if="isloading">
                        <beat-loader
                          :loading="loading"
                          :color="color"
                          :size="size"
                        ></beat-loader>
                      </template>
                      <template v-else><i class="fas fa-shopping-basket"></i></template>
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <router-link
                      :to="{ name: 'checkoutPage' }"
                      class="product-add"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct)"
                    >
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
                      <button
                        class="action-minus"
                        @click.prevent="decrementCartItem"
                        title="Quantity Minus"
                      >
                        <i class="icofont-minus"></i>
                      </button>
                      <input
                        class="action-input text-center"
                        title="Quantity Number"
                        type="text"
                        name="quantity"
                        v-model="quantityInput"
                      />
                      <button
                        class="action-plus"
                        @click.prevent="incrementCartItem"
                        title="Quantity Plus"
                      >
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <button
                      class="product-add"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct)"
                    >
                      <template v-if="isloading">
                        <beat-loader
                          :loading="loading"
                          :color="color"
                          :size="size"
                        ></beat-loader>
                      </template>
                      <template v-else><i class="fas fa-shopping-basket"></i></template>
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <router-link
                      :to="{ name: 'checkoutPage' }"
                      class="product-add"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct)"
                    >
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
              <li>
                <a href="#tab-desc" class="tab-link active" data-bs-toggle="tab"
                  >descriptions</a
                >
              </li>
              <li>
                <a href="#tab-spec" class="tab-link" data-bs-toggle="tab"
                  >Specifications</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade show active" id="tab-desc">
          <div class="row">
            <div class="col-lg-6 order-lg-1 order-2">
              <div class="product-details-frame">
                <div class="tab-descrip">
                  {{ singleProduct?.short_description }}
                </div>
              </div>
            </div>
            <div class="col-lg-6 order-lg-2 order-1">
              <div class="product-details-frame">
                <div class="tab-descrip">
                  <img src="@/assets/images/video.jpg" alt="video" />
                  <a
                    title="Product Video"
                    href="https://youtu.be/9xzcVxSBbG8"
                    class="venobox fas fa-play"
                    data-autoplay="true"
                    data-vbtype="video"
                  ></a>
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
                      <td>{{ singleProduct?.category }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Brand</th>
                      <td>{{ singleProduct?.brand }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Type</th>
                      <td>{{ singleProduct?.type }}</td>
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
                 PRODUCT Up Sale Product PART START
        =======================================-->
    <section class="inner-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>Up Sell Products</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div
            class="col"
            v-for="(upSellProducts, index) in singleProduct?.up_sell_products"
            :key="index"
          >
            <ProductCard :product="upSellProducts" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline">
                <i class="fas fa-eye"></i>
                <span>view all related</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=====================================
                 PRODUCT Up Sale Product PART END
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
          <div
            class="col"
            v-for="(relatedProduct, index) in relatedProducts"
            :key="index"
          >
            <ProductCard :product="relatedProduct" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <router-link
                :to="{ name: 'shopPage', query: { category: categoryId } }"
                class="btn btn-outline"
              >
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

.disabled {
  background: #c48b8b !important;
}

.border-radius {
  border-radius: 12px;
}

img {
  width: 100%;
  display: block;
}

.img-display {
  overflow: hidden;
}

.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}

.img-showcase img {
  min-width: 100%;
}

.img-select {
  display: flex;
}

.img-item {
  margin: 0.3rem;
}

.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3) {
  margin-right: 0;
}

.img-item:hover {
  opacity: 0.8;
}

.active-thumb {
  border: 2px solid #119744;
}

.img-item {
  width: 23%;
}

.img-select {
  margin-top: 10px;
}

.selectedSizeColor {
  color: white !important;
  background-color: #ff0000 !important;
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
