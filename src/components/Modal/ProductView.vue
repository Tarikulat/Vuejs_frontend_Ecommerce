<script setup>
import {LoginFrom, Modal} from "@/components"

</script>


<template lang="">
    <Modal>
      <div class="product-view">
            <div class="row">
              <div class=" col-md-12 col-lg-12">
                  <div class="user-form-logo">
                      <router-link :to="{name: 'homePage'}"><img src="@/assets/images/maxfit.png" alt="logo" /></router-link>
                  </div>
                  <LoginFrom />
                  <div class="user-form-remind">
                      <p>Don't have any account?<router-link :to="{name: 'Registration'}"><span data-bs-dismiss="modal">register here</span></router-link></p>
                  </div>
              </div>
            </div>
          </div>
    </Modal>
</template>

<style>

</style>
