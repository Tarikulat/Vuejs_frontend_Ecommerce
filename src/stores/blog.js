// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useBlog = defineStore('blog', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getBlogPost(tagId = "", searchBlogPost = '') {
      try {
        const res = await axiosInstance.get("/blog-posts", {
          params: {
            tag_id:tagId,
            title:searchBlogPost,
          },
        });
        if (res.status === 200) {
            return res.data
        }else{
            console.log('errors in blog posts');
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },



    async getTag() {
      try {
        const res = await axiosInstance.get("/tags");
        if (res.status === 200) {
            return res.data
        }else{
            console.log('errors in tags');
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },

    async getSingleBlogPost(postId) {
      try {
        const res = await axiosInstance.get(`/blog-posts/${postId}`);
        if (res.status === 200) {
            return res.data
        }else{
            console.log('errors in tags');
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................