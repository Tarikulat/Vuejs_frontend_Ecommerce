<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted } from "vue";

import { useAuth, useNotification } from "@/stores";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";
// router pushing
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const {backendErrors} = storeToRefs(useAuth())
// All Variable  Code Is Here.....................................................................................................
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const showPassword = ref(false);
const notify = useNotification();
// API Calling Code Is Here.....................................................................................................
const onSubmit = async (values, { setErrors, resetForm }) => {
  try {
    const res = await auth.register(values);
    console.log(res);
    if (res.success) {
    //   resetForm();
    //   modal.closeModal()
      router.push({ name: "Login" });
      notify.Success("Registration Successfully Done");
    } else {
      console.error("Unexpected response:", res);
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any other errors here
  }
};

// All Function  Code Is Here.....................................................................................................

const schema = yup.object({
  // validation code . eta ekta package
  phone_number: yup.string().required("Phone Feild Is Required"),
  email: yup.string().required("Email Feild Is Required"),
  name: yup.string().required("Name Feild Is Required"),
  password: yup.string().required("Password Must be 8 Characters"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});


onMounted(() => {

  $("#login-modal").modal("hide")

});

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
                        <div class="user-form-card">
                            <div class="user-form-title">
                                <h2>Join Now!</h2>
                                <p>Setup A New Account In A Minute</p>
                            </div>
                            <div class="user-form-group">
                                <Form
                                    class="user-form"
                                    @submit="onSubmit"
                                    :validation-schema="schema"
                                    v-slot="{ errors, isSubmitting }"
                                >
                                <div class="form-group">
                                    <Field
                                    name="name"
                                    type="text"
                                    class="form-control"
                                    placeholder="Full Name"
                                    :class="{ 'is-invalid': errors.name }"
                                    />
                                    <span class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                                    <template  v-if="backendErrors.name">
                                         <span class="text-danger" v-show="backendErrors.name">{{ backendErrors.name[0] }}</span>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <Field
                                    name="email"
                                    type="text"
                                    class="form-control"
                                    placeholder="Email Address"
                                    :class="{ 'is-invalid': errors.email }"
                                    />
                                    <span class="text-danger" v-if="errors.email">{{ errors.email }}</span>
                                    <template  v-if="backendErrors.email">
                                         <span class="text-danger" v-show="backendErrors.email">{{ backendErrors.email[0] }}</span>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <Field
                                    name="phone_number"
                                    type="text"
                                    class="form-control"
                                    placeholder="phone no"
                                    :class="{ 'is-invalid': errors.phone_number }"
                                    />
                                    <span class="text-danger" v-if="errors.phone_number">{{ errors.phone_number }}</span>
                                    <template  v-if="backendErrors.phone_number">
                                         <span class="text-danger" v-show="backendErrors.phone_number">{{ backendErrors.phone_number[0] }}</span>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <Field
                                    name="password"
                                    type="text"
                                    class="form-control"
                                    placeholder="Password"
                                    :class="{ 'is-invalid': errors.password }"
                                    />
                                    <span class="text-danger" v-if="errors.password">{{ errors.password }}</span>
                                    <template  v-if="backendErrors.password">
                                         <span class="text-danger" v-show="backendErrors.password">{{ backendErrors.password[0] }}</span>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <Field
                                    name="password_confirmation"
                                    type="text"
                                    class="form-control"
                                    placeholder="Confirmed Password"
                                    :class="{ 'is-invalid': errors.password_confirmation }"
                                    />
                                    <span class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
                                    <template  v-if="backendErrors.password_confirmation">
                                         <span class="text-danger" v-show="backendErrors.password_confirmation">{{ backendErrors.password_confirmation[0] }}</span>
                                    </template>
                                </div>
                                    <div class="form-button">
                                        <button type="submit">register <span
                                                v-show="isSubmitting"
                                                class="spinner-border spinner-border-sm mr-1"
                                            ></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="user-form-remind">
                            <p>Already Have An Account?<router-link :to="{name: 'Login'}">login here</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>