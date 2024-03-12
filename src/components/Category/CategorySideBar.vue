<script setup>
// All Import File  Code Is Here......................................................................................................
import { useCategory } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'; 

// All Variable  Code Is Here.....................................................................................................
const category = useCategory();
const { categories } = storeToRefs(category);

// API Calling Code Is Here.....................................................................................................



// All Function  Code Is Here.....................................................................................................



// function categoryDropdown() {
//     // $(".dropdown-link").click(function() {
//     //     $(this).next().toggle();
//     //     $(this).toggleClass('active');
//     //     if($('.dropdown-list:visible').length > 1) {
//     //         $('.dropdown-list:visible').hide();
//     //         $(this).next().show();
//     //         $('.dropdown-link').removeClass('active');
//     //         $(this).addClass('active');
//     //     }
//     // });

//     this.isActive = this.isActive ? false : true;


// }

const activeIndex = ref(null);

function toggleDropdown(index) {
  if (activeIndex.value === index) {
    activeIndex.value = null; // Hide dropdown if already active
  } else {
    activeIndex.value = index; // Show dropdown of clicked item
  }
}


</script>

<template lang="">
  <div>
     <aside class="category-sidebar">
            <div class="category-header">
                <h4 class="category-title">
                    <i class="fas fa-align-left"></i>
                    <span>categories</span>
                </h4>
                <button class="category-close"><i class="icofont-close"></i></button>
            </div>
            <ul class="category-list">
                 <li class="category-item" v-for="(category, index) in categories.result" :key="index" @click="toggleDropdown(index)">
                    <router-link :to="{ name:'shopPage', query:{ category: category.id} }" class="category-link dropdown-link" :class="{ active: activeIndex === index }">
                        <i class="flaticon-vegetable"></i>
                        <span>{{ category.name }}</span>
                    </router-link>
                    <ul class="dropdown-list:visible" v-show="activeIndex === index">
                        <li class="category-item" v-for="(subCategory, index) in category.sub_category">
                          <router-link :to="{ name:'shopPage', query:{ subCategory: subCategory.id} }" class="category-link">{{ subCategory.name }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="category-footer">
                <p>All Rights Reserved by <a href="#">Service Key</a></p>
            </div>
        </aside>
  </div>
</template>

<style>

</style>
