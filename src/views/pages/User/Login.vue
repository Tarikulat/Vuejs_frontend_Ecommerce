
<script setup>
import {LoginFrom} from "@/components"
</script>

<template>
    <div>
        <section class="user-form-part">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                        <div class="user-form-logo">
                            <router-link :to="{name: 'homePage'}"><img src="@/assets/images/maxfit.png" alt="logo" /></router-link>
                        </div>
                        
                        <LoginFrom />

                        <div class="user-form-remind">
                            <p>Don't have any account?<router-link :to="{name: 'Registration'}" href="register.html">register here</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>