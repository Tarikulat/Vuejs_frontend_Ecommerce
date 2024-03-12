<script setup>
import { ref, onMounted, computed } from "vue";
import { useBlog } from '@/stores'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const blog = useBlog();

const route = useRoute();




// // tag data start
const singleBlogPost = ref()
// // tag data end



// tag data start
const getBlogPostDetails = async () => {
    const res = await blog.getSingleBlogPost(route.params.postId); 
    if (res.success) {
        singleBlogPost.value = res
    }
}
// tag data end

// Define a computed property to format the date
const formattedDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};

onMounted(() => {
    getBlogPostDetails();
});
</script>

<template>
    <div>
        <!--=====================================
                  BLOG DETAILS PART START
        =======================================-->
        <section class="inner-section blog-details-part mt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12 col-xl-10">
                        <article class="blog-details">
                            <a class="blog-details-thumb" href="">
                                <img :src="singleBlogPost?.result?.image" alt="blog">
                            </a>
                            <div class="blog-details-content">
                                <ul class="blog-details-meta">
                                    <li>
                                        <i class="icofont-ui-calendar"></i>
                                        <span>{{ formattedDate(singleBlogPost?.result?.created_at) }}</span>
                                    </li>
                                </ul>
                                <h2 class="blog-details-title">{{ singleBlogPost?.result?.title }}</h2>
                                <p class="blog-details-desc">{{ singleBlogPost?.result?.description }}</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                  BLOG DETAILS PART END
        =======================================-->
    </div>
</template>

<style scoped>

.blog-img img {
    max-height: 380px
}

</style>