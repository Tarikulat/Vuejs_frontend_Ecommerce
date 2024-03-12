<script setup>
import { CartSideBar, MobileMenu } from '@/components';
import { ref, onMounted, computed } from "vue";
import { useBlog, useCategory } from '@/stores'
import { storeToRefs } from 'pinia';

const blog = useBlog();
const category = useCategory();
const {categories} = storeToRefs(category);
// getBlogPost data start
const blogPostData = ref()
// getBlogPost data end
// tag data start
const tagData = ref()
const tagId = ref()
// tag data end

//searchingn in blog post start
const searchBlogPost = ref()
//searchingn in blog post end

// getBlogPost data start
const getBlogPost = async (tagID = '', BlogPost) => {
    const res = await blog.getBlogPost(tagID, BlogPost); 
    if (res.success) {
        blogPostData.value = res.result.data
        tagId.value = tagID
    }
}



const searchQuery = async() => {
    getBlogPost('', searchBlogPost.value)
}



// Define a computed property to format the date
const formattedDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};
// getBlogPost data end


// tag data start
const getTags = async () => {
    const res = await blog.getTag(); 
    if (res.success) {
        tagData.value = res
    }
}
// tag data end


// watch(
//   () => {searchBlogPost.value},
//   async (newValue, oldValue) => {
//     if (newValue.length >= 3 || oldValue.length >= 3) {
//         console.log("sdfsdaf");
//       getProducts();
//     }
//   }
// );


onMounted(() => {
  getTags();
  getBlogPost();
  category.getData()
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
                  CART SIDEBAR PART START
        =======================================-->
         <CartSideBar />
    <!--=====================================
                    CART SIDEBAR PART END
        =======================================-->
        <!--=====================================
                    BLOG GRID PART START
        =======================================-->
        <section class="inner-section blog-grid mt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-md-6 col-lg-6" v-for="(blogPost, index) in blogPostData" :key="index">
                                <div class="blog-card">
                                    <div class="blog-media">
                                        <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-img" href="#">
                                            <img :src="blogPost.image" alt="blog">
                                        </router-link>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="blog-meta">
                                            <li>
                                                <i class="fas fa-user"></i>
                                                <span>admin</span>
                                            </li>
                                            <li>
                                                <i class="fas fa-calendar-alt"></i>
                                                <span>{{ formattedDate(blogPost.created_at) }}</span>
                                            </li>
                                        </ul>
                                        <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-title">
                                            <a href="blog-details.html">{{ blogPost.title }}</a>
                                        </router-link>
                                        <p class="blog-desc">
                                            {{ $filters.textShort(blogPost.description, 100) }}
                                        </p>
                                        <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-btn" href="#">
                                            <span>read more</span>
                                            <i class="icofont-arrow-right"></i>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="bottom-paginate">
                                    <p class="page-info">Showing 12 of 60 Results</p>
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <i class="fas fa-long-arrow-alt-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link active" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">...</li>
                                        <li class="page-item"><a class="page-link" href="#">60</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <i class="fas fa-long-arrow-alt-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-lg-4">
                        <div class="blog-widget">
                            <h3 class="blog-widget-title">Find blogs</h3>
                            <form class="blog-widget-form">
                                <input type="text" v-model="searchBlogPost" @input="searchQuery" placeholder="Search blogs">
                                <button class="icofont-search-1"></button>
                            </form>
                        </div>
                        <!-- <div class="blog-widget">
                            <h3 class="blog-widget-title">popular feeds</h3>
                            <ul class="blog-widget-feed">
                                <li  v-for="(blogPost, index) in blogPostData?.slice(0, 5)" :key="index">
                                    <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-widget-media" >
                                        <img :src="blogPost.image" alt="blog-widget">
                                    </router-link>
                                    <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-widget-text">
                                        <a href="#">{{ blogPost.title }}</a>
                                        <span>{{ formattedDate(blogPost.created_at) }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div> -->
                        <!-- <div class="blog-widget">
                            <h3 class="blog-widget-title">top categories</h3>
                            <ul class="blog-widget-category">
                                <li v-for="(category, index) in categories.result?.slice(0, 5)" :key="index"><a href="#" >{{ category.name}}<span>22</span></a></li>
                            </ul>
                        </div> -->
                        <div class="blog-widget">
                            {{ tagId }}
                            <h3 class="blog-widget-title">popular tags</h3>
                            <ul class="blog-widget-tag">
                                <li v-for="(tag, index) in tagData?.result" :key="index"><a href="#" @click.prevent="getBlogPost(tag.id)" :class="{ 'selectedSizeColor' : tagId === tag.id }" >{{ tag.name }}</a></li>
                            </ul>
                        </div>
                        <div class="blog-widget">
                            <h3 class="blog-widget-title">follow us</h3>
                            <ul class="blog-widget-social">
                                <li><a  class="icofont-facebook"></a></li>
                                <li><a  class="icofont-twitter"></a></li>
                                <li><a  class="icofont-linkedin"></a></li>
                                <li><a  class="icofont-pinterest"></a></li>
                                <li><a  class="icofont-instagram"></a></li>
                            </ul>
                        </div>
                        <div class="blog-widget">
                            <a href="#"><img class="img-fluid" src="@/assets/images/promo/blog/01.jpg" alt="promo"></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    BLOG GRID PART END
        =======================================-->
    </div>
</template>

<style scoped>

/* search result start */
.searchResults{
    background-color: #e8e8e8;
    border-radius: 3px;
    margin-top: 5px;
}

.searchResults img{
    width: 50%;
}
/* search result end */

.blog-img img {
    max-height: 380px
}

.selectedSizeColor {
    color: white !important;
    background-color: #ff0000 !important;
    }

</style>