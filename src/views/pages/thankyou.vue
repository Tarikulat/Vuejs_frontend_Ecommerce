<script setup>

</script>
<template>
    <div>
        <div class=content>
            <div class="wrapper-1">
                <div class="wrapper-2">
                    <h1>ধন্যবাদ  !</h1>
                    <p> আপনার অর্ডারটি সফল ভাবে সম্পূর্ণ হয়েছে .</p>
                    <router-link :to="{name:'homePage'}" class="go-home"><i class="fas fa-home"></i>হোম পেইজ</router-link>
                </div>
                <div class="footer-like">   
                    <p>Are you purchase anything? <router-link :to="{name:'shopPage'}">শপ পেইজ</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scope>
.content{
    padding: 100px 0;
}
.wrapper-1{
  width:100%;
  height:100vh;
  display: flex;
  flex-direction: column;
}
.wrapper-2{
  padding :30px;
  text-align:center;
}
h1{
    font-family: 'Kaushan Script', cursive;
  font-size:4em;
  letter-spacing:3px;
  color:#3a414e ;
  margin:0;
  margin-bottom:20px;
}
.wrapper-2 p{
  margin:0;
  font-size:1.3em;
  color:#119744;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.go-home{
  color:#fff;
  background:#5892FF;
  border:none;
  padding:10px 50px;
  margin:30px 0;
  border-radius:30px;
  text-transform:capitalize;
  box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
}
.footer-like{
  margin-top: auto; 
  background:#D7E6FE;
  padding:6px;
  text-align:center;
}
.footer-like p{
  margin:0;
  padding:4px;
  color:#5892FF;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.footer-like p a{
  text-decoration:none;
  color:#5892FF;
  font-weight:600;
}

@media (min-width:360px){
  h1{
    font-size:4.5em;
  }
  .go-home{
    margin-bottom:20px;
  }
}

@media (min-width:600px){
  .content{
  max-width:1000px;
  margin:0 auto;
}
  .wrapper-1{
  height: initial;
  max-width:620px;
  margin:0 auto;
  margin-top:50px;
  box-shadow: 4px 8px 40px 8px rgba(26, 59, 121, 0.2);
}
  
}
</style>