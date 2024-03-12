<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";

// All Variable  Code Is Here.....................................................................................................

const props = defineProps({
  bannerAllItems: Object,
  required: true,
});

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <section class="section promo-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div
              class="promo-content"
              :style="{
                background: `url(${bannerAllItems?.image}) no-repeat center center / cover`,
              }"
            >
              <!-- <h3>only <span>$45</span> per kilogram</h3> -->
              <h3>{{ bannerAllItems?.title }}</h3>
              <h2>{{ bannerAllItems?.type }}</h2>
              <a :href="bannerAllItems?.link" class="btn btn-inline">
                <i class="fas fa-shopping-basket"></i>
                <span>shop now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
