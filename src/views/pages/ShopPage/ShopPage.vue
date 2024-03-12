<script setup>
// All inport  Code Is Here.....................................................................................................
import {
  ProductCard,
  ProductView,
  CartSideBar,
  MobileMenu,
  CategorySideBar,
  BannerPart,
} from "@/components";
import { ProductSkeleton, ShopSideBarSkeleton } from "@/components/skeleton";
import { useRoute } from "vue-router";
import { ref, onMounted, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { gsap } from "gsap";
// product data fetch
import { useShop, useCart, useNotification } from "@/stores";

// All Variable  Code Is Here.....................................................................................................
const route = useRoute();

const cart = useCart();
const { loadings } = storeToRefs(cart);
const isloadings = ref(loadings);
const notify = useNotification();
const quantityInput = ref(1);

const shop = useShop();
const { products, sideBar, loading } = storeToRefs(shop);
const paginateSize = ref();

const searchBrandQuery = ref("");
const searchCategoryQuery = ref("");

const productType = ref("");
const selectedBrandIds = ref([]);
const selectedCategoryIds = ref([]);
const selectedSubCategoryIds = ref();

const sortingPrice = ref([]);

const isloading = ref(loading);
const color = "white";
const size = "8px";

const searchQuery = ref("");

// tab section
const currentTab = ref("three");

const price = ref();

// API Calling Code Is Here.....................................................................................................

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

watch(
  () => [...searchQuery.value],
  async (newValue, oldValue) => {
    if (newValue.length >= 3 || oldValue.length >= 3) {
      getProducts();
    }
  }
);

// All Function  Code Is Here.....................................................................................................

function addToCart(tProduct) {
  if (tProduct.offer_price != 0) {
    price.value = tProduct.offer_price;
  } else {
    price.value = tProduct.mrp;
  }

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

  notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
}

const searchCategories = computed(() => {
  return shop.sideBar.result.categories.filter((category) => {
    return category.name
      .toLowerCase()
      .match(searchCategoryQuery.value.toLocaleLowerCase());
  });
});

const searchBrands = computed(() => {
  return shop.sideBar.result.brands.filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});

const getProducts = () => {
  products.value = [];
  shop.getData(
    productType.value,
    selectedBrandIds.value,
    selectedCategoryIds.value,
    selectedSubCategoryIds.value,
    sortingPrice.value,
    searchQuery.value,
    paginateSize.value,
  );
};

function clearFilter(data) {
  if (data == "brand") {
    selectedBrandIds.value = [];
  } else {
    selectedCategoryIds.value = [];
  }

  getProducts();
}

// Category wise product showing

const queryProducts = () => {
  selectedCategoryIds.value = [];
  selectedBrandIds.value = [];
  if (route.query.category) {
    selectedCategoryIds.value.push(route.query.category);
  }
  if (route.query.subCategory) {
    selectedSubCategoryIds.value = route.query.subCategory;
  }
  if (route.query.brand) {
    selectedBrandIds.value.push(route.query.brand);
  }
  if (route.query.recent) {
    productType.value = route.query.recent;
  }
  if (route.query.top) {
    productType.value = route.query.top;
  }
  if (route.query.feature) {
    productType.value = route.query.feature;
  }
};

// category slug wise product showing
watch(
  () => route.query.category || route.query.brand || route.query.subCategory,
  async (newValue, oldValue) => {
    queryProducts();
    getProducts();
  }
);

onMounted(() => {
  queryProducts();
  shop.getData();
  shop.sideBarData();
  getProducts();
  $(document).ready(function () {
    $(".venobox").venobox();
  });
});
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

    <CartSideBar />

    <!--=====================================
                    MOBILE-MENU PART START
        =======================================-->
    <MobileMenu />
    <!--=====================================
                    MOBILE-MENU PART END
        =======================================-->

<!--=====================================
                    PRODUCT VIEW START
        =======================================-->
        <ProductView />
    <!--=====================================
                    PRODUCT VIEW END
        =======================================-->

    <!--=====================================
                    BANNER PART START
        =======================================-->

    <BannerPart :title="'Shop Page'" />
    <!--=====================================
                    BANNER PART END
        =======================================-->
    <section class="inner-section shop-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <template v-if="sideBar.result">
              <div class="shop-widget-promo">
                <a href="#"><img src="@/assets/images/promo/shop/01.jpg" alt="promo" /></a>
              </div>
              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Price</h6>
                <form>
                  <div class="shop-widget-group">
                    <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${$filters.currencySymbol(
                      sideBar.result.min_price
                    )}`" />
                    <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${$filters.currencySymbol(
                      sideBar.result.max_price
                    )}`" />
                  </div>
                  <button class="shop-widget-btn" @click.prevent="getProducts">
                    <template v-if="isloading">
                      <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
                    </template>
                    <template v-else><i class="fas fa-search"></i></template>
                    <span>search</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Brand</h6>
                <form>
                  <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchBrandQuery" />
                  <TransitionGroup tag="ul" class="shop-widget-list shop-widget-scroll" :css="false">
                    <li v-for="(brand, index) in searchBrands" :key="index">
                      <div class="shop-widget-content">
                        <input type="checkbox" :id="`brand${index}`" :value="brand.id" v-model="selectedBrandIds"
                          @change="getProducts" />
                        <label :for="`brand${index}`">{{ brand.name }}</label>
                      </div>
                      <span class="shop-widget-number">({{ brand.products_count }})</span>
                    </li>
                    <li v-show="searchBrands.length === 0">
                      <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                    </li>
                  </TransitionGroup>
                  <button class="shop-widget-btn" @click.prevent="clearFilter('brand')">
                    <i class="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Category</h6>
                <form>
                  <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchCategoryQuery" />
                  <ul class="shop-widget-list shop-widget-scroll">
                    <li v-for="(category, index) in searchCategories" :key="index">
                      <div class="shop-widget-content">
                        <input type="checkbox" :id="`cate${index}`" :value="category.id" @change="getProducts"
                          v-model="selectedCategoryIds" />
                        <label :for="`cate${index}`">{{ category.name }}</label>
                      </div>
                      <span class="shop-widget-number">({{ category.products_count }})</span>
                    </li>
                    <li v-show="searchCategories.length === 0">
                      <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                    </li>
                  </ul>
                  <button class="shop-widget-btn" @click.prevent="clearFilter('category')">
                    <i class="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
            </template>
            <template v-else>
              <ShopSideBarSkeleton />
            </template>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div class="top-filter">
                  <div class="filter-short">
                    <label class="filter-label">Short by :</label>
                    <select class="form-select filter-select" @change="getProducts" v-model="productType">
                      <option value="" selected>All</option>
                      <option value="top-product">Top</option>
                      <option value="feature-product">Feature</option>
                      <option value="recent-product">Recent</option>
                    </select>
                  </div>
                  <div class="filter-show">
                    <input type="search" class="form-control formControl" placeholder="Searching....."
                      v-model="searchQuery" />
                  </div>
                  <div class="filter-action">
                    <a href="" @click.prevent="currentTab = 'three'" :class="currentTab === 'three' ? 'active' : ''"
                      title="Three Column"><i class="fas fa-th"></i></a>
                    <a href="" @click.prevent="currentTab = 'two'" :class="currentTab === 'two' ? 'active' : ''"
                      title="Two Column"><i class="fas fa-th-large"></i></a>
                    <a href="" @click.prevent="currentTab = 'one'" :class="currentTab === 'one' ? 'active' : ''"
                      title="One Column"><i class="fas fa-th-list"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="currentTab === 'three'">
              <Transition name="fade" mode="out-in">
                <template v-if="!products.data">
                  <ProductSkeleton :dataAmount="20" :cols="3" />
                </template>
                <template v-else>
                  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                    <div class="col" v-for="(product, index) in products.data" :key="product.id">
                      <ProductCard :product="product" />
                    </div>
                  </div>
                </template>
              </Transition>
            </template>

            <template v-if="currentTab === 'two'">
              <Transition name="fade" mode="out-in">
                <template v-if="!products.data">
                  <ProductSkeleton :dataAmount="20" :cols="2" />
                </template>
                <template v-else>
                  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-2">
                    <div class="col" v-for="(product, index) in products.data" :key="product.id">
                      <ProductCard :product="product" />
                    </div>
                  </div>
                </template>
              </Transition>
            </template>

            <template v-if="currentTab === 'one'">
              <Transition name="fade" mode="out-in">
                <template v-if="!products.data">
                  <ProductSkeleton :dataAmount="20" :cols="3" />
                </template>
                <template v-else>
                  <div class="row">
                    <div class="col" v-for="(product, index) in products.data" :key="product.id">
                      <div class="product-standard">
                        <div class="standard-label-group">
                          <label class="standard-label off">-{{ product.offer_percent }}%</label>
                          <label class="label-text new">{{ product.type }}</label>
                        </div>
                        <div class="standard-media">
                          <a class="standard-image">
                            <img :src="product.image" alt="product" />
                          </a>
                          <div class="standard-widget" v-show="product.video_url">
                            <a title="Product Video" :href="product.video_url" class="venobox fas fa-play"
                              data-autoplay="true" data-vbtype="video"></a>
                          </div>
                        </div>
                        <div class="standard-content">
                          <h4 class="standard-name">
                            <a>{{ product.name }}</a>
                          </h4>
                          <h5 class="standard-price">
                            <del>{{ $filters.currencySymbol(product.mrp) }}</del>
                            <span>{{
                              $filters.currencySymbol(product.offer_price)
                            }}</span>
                          </h5>
                          <div class="standard-rating">
                            <i class="active icofont-star"></i>
                            <i class="active icofont-star"></i>
                            <i class="active icofont-star"></i>
                            <i class="active icofont-star"></i>
                            <i class="icofont-star"></i>
                            <a>(3)</a>
                          </div>
                          <p class="standard-desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit
                            molestias quaerat rem ullam ut nam quibusdam labore sed magnam
                            eos Inventore quis corrupti nemo ipsa ratione culpa porro
                            vitae.
                          </p>
                          <div class="standard-action-group">
                            <button class="product-add" title="Add to Cart" @click.prevent="addToCart(product)">
                              <template v-if="cart.loading === product.id">
                                <pulse-loader :loading="isloadings" :color="color" :size="size"></pulse-loader>
                              </template>
                              <template v-else>
                                <i class="fas fa-shopping-basket"></i>
                              </template>
                              <span>কার্টে যোগ করুন</span>
                            </button>
                            <div class="product-action">
                              <button class="action-minus" title="Quantity Minus">
                                <i class="icofont-minus"></i>
                              </button>
                              <input class="action-input" title="Quantity Number" type="text" name="quantity" value="1" />
                              <button class="action-plus" title="Quantity Plus">
                                <i class="icofont-plus"></i>
                              </button>
                            </div>
                            <button class="standard-wish wish" title="Add to Wishlist">
                              <i class="fas fa-heart"></i>
                              <span>অর্ডার করুন</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </Transition>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scope>
@media (max-width: 576px) {
  .formControl {
    width: 88% !important;
    height: 40px !important;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
