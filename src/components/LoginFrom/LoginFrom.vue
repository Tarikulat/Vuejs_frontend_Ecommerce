<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";

import { useAuth, useNotification, useModal } from "@/stores";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";
// router pushing
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const {backendErrors} = storeToRefs(useAuth())
// All Variable  Code Is Here.....................................................................................................
const modal = useModal();
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const showPassword = ref(false);
const notify = useNotification();
// API Calling Code Is Here.....................................................................................................
const onSubmit = async (values, { setErrors, resetForm }) => {
  try {
    const res = await auth.login(values);
    if (res.data) {
    //   resetForm();
      modal.Modalclose() 
      if (route.path === "/login") {
          router.push({ name: route.path === "/login" ? "homePage" : "" });
        }else{
          router.push({ name: "checkoutPage" });
      }
      notify.Success("Login Successfully Done");
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
  password: yup.string().required(),
});

const toggleShow = () => {
  // password show on and off korar jonno ei function ready kora hoise .
  showPassword.value = !showPassword.value;
};
</script>1

<template>
    <div class="user-form-card">
        <div class="user-form-title">
            <h2>welcome!</h2>
            <p>Use your credentials to access</p>
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
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="password"
                :class="{ 'is-invalid': errors.password }"
                />
                <span class="text-danger" v-if="errors.password">{{errors.password}}</span>
                
                <span class="text-danger" v-if="backendErrors">{{ backendErrors}}</span>
            </div>
                <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">
                        login
                        <span
                            v-show="isSubmitting"
                            class="spinner-border spinner-border-sm mr-1"
                        ></span>
                    </button>
                    <!-- <p>Forgot your password?<a href="reset-password.html">reset here</a></p> -->
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>

</style>