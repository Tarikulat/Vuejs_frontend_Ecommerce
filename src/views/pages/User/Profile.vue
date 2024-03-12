<script setup>
import axiosInstance from "@/services/axiosService.js";
import { useAuth, useModal } from '@/stores';
import { ref, onMounted } from 'vue';
import {Modal} from "@/components"
const auth = useAuth();
const profileData = ref();

const modal    = useModal()
const id     = ref()
const name     = ref()
const password = ref()

const getData = async() => {
          profileData.value = await auth.profile()
          id.value   = profileData.value.id
          name.value = profileData.value.name
}

const profileInfoUpdate = async () => {
    
     const res =  await auth.profileUpdate(id.value, name.value, password.value)
     console.log(res);
     if (res) {
        modal.Modalclose()
        getData();
     }
      
}

onMounted(() => {
    getData();
})

</script>

<template>
    <div>
         <!--=====================================
                    PROFILE PART START
        =======================================-->
        <section class="inner-section profile-part mt-5">
            <div class="container">


                <Modal>
                    <form class="modal-form">
                        <div class="form-title">
                            <h3>edit profile info</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">name</label>
                            <input class="form-control" type="text" v-model="name">
                        </div>
                        <div class="form-group">
                            <label class="form-label">New Password</label>
                            <input class="form-control" type="password" v-model="password">
                        </div>
                        <button class="form-btn" type="submit" @click.prevent="profileInfoUpdate()">Update profile info</button>
                    </form>    
                </Modal>

                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>Your Profile</h4>
                                <button @click.prevent="modal.toggleModal()">edit profile</button>
                            </div>
                            <div class="account-content">
                                <div class="row" v-if="profileData">
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">name</label>
                                            <input class="form-control" type="text" :value="profileData.name" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">Email</label>
                                            <input class="form-control" type="email" :value="profileData.email" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number</label>
                                            <input class="form-control" type="email" :value="profileData.phone_number" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    PROFILE PART END
        =======================================-->
    </div>
</template>

<style scoped>

</style>