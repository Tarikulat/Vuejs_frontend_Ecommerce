<script setup>
// All Import File  Code Is Here......................................................................................................

// All Variable  Code Is Here.....................................................................................................


// API Calling Code Is Here.....................................................................................................


// All Function  Code Is Here.....................................................................................................


</script>

<template lang="">
  <div>
    <aside class="nav-sidebar">
      <div class="nav-header">
        <a href="#"><img src="@/assets/images//logo.png" alt="logo" /></a>
        <button class="nav-close"><i class="icofont-close"></i></button>
      </div>
      <div class="nav-content">
        <div class="nav-btn">
          <a href="login.html" class="btn btn-inline">
            <i class="fa fa-unlock-alt"></i>
            <span>join here</span>
          </a>
        </div>
        <!-- This commentable code show when user login or register -->
        <!-- <div class="nav-profile">
                    <a class="nav-user" href="#"><img src="@/assets/images//user.png" alt="user"></a>
                    <h4 class="nav-name"><a href="profile.html">Miron Mahmud</a></h4>
                </div> -->
        <div class="nav-select-group">
          <div class="nav-select">
            <i class="icofont-world"></i>
            <select class="select">
              <option value="english" selected>English</option>
              <option value="bangali">Bangali</option>
              <option value="arabic">Arabic</option>
            </select>
          </div>
          <div class="nav-select">
            <i class="icofont-money"></i>
            <select class="select">
              <option value="english" selected>Doller</option>
              <option value="bangali">Pound</option>
              <option value="arabic">Taka</option>
            </select>
          </div>
        </div>
        <ul class="nav-list">
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-home"></i>Home</a
            >
            <ul class="dropdown-list">
              <li><a href="home-grid.html">Home grid</a></li>
              <li><a href="index.html">Home index</a></li>
              <li><a href="home-classic.html">Home classic</a></li>
              <li><a href="home-standard.html">Home standard</a></li>
              <li><a href="home-category.html">Home category</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-food-cart"></i>shop</a
            >
            <ul class="dropdown-list">
              <li><a href="shop-5column.html">shop 5 column</a></li>
              <li><a href="shop-4column.html">shop 4 column</a></li>
              <li><a href="shop-3column.html">shop 3 column</a></li>
              <li><a href="shop-2column.html">shop 2 column</a></li>
              <li><a href="shop-1column.html">shop 1 column</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-page"></i>product</a
            >
            <ul class="dropdown-list">
              <li><a href="product-tab.html">product tab</a></li>
              <li><a href="product-grid.html">product grid</a></li>
              <li><a href="product-video.html">product video</a></li>
              <li><a href="product-simple.html">product simple</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-bag-alt"></i>my account</a
            >
            <ul class="dropdown-list">
              <li><a href="profile.html">profile</a></li>
              <li><a href="wallet.html">wallet</a></li>
              <li><a href="wishlist.html">wishlist</a></li>
              <li><a href="compare.html">compare</a></li>
              <li><a href="checkout.html">checkout</a></li>
              <li><a href="orderlist.html">order history</a></li>
              <li><a href="invoice.html">order invoice</a></li>
              <li><a href="email-template.html">email template</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-lock"></i>authentic</a
            >
            <ul class="dropdown-list">
              <li><a href="login.html">login</a></li>
              <li><a href="register.html">register</a></li>
              <li><a href="reset-password.html">reset password</a></li>
              <li><a href="change-password.html">change password</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link dropdown-link" href="#"
              ><i class="icofont-book-alt"></i>blogs</a
            >
            <ul class="dropdown-list">
              <li><a href="blog-grid.html">blog grid</a></li>
              <li><a href="blog-standard.html">blog standard</a></li>
              <li><a href="blog-details.html">blog details</a></li>
              <li><a href="blog-author.html">blog author</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link" href="offer.html"
              ><i class="icofont-sale-discount"></i>offers</a
            >
          </li>
          <li>
            <a class="nav-link" href="about.html"
              ><i class="icofont-info-circle"></i>about us</a
            >
          </li>
          <li>
            <a class="nav-link" href="faq.html"
              ><i class="icofont-support-faq"></i>need help</a
            >
          </li>
          <li>
            <a class="nav-link" href="contact.html"
              ><i class="icofont-contacts"></i>contact us</a
            >
          </li>
          <li>
            <a class="nav-link" href="privacy.html"
              ><i class="icofont-warning"></i>privacy policy</a
            >
          </li>
          <li>
            <a class="nav-link" href="coming-soon.html"
              ><i class="icofont-options"></i>coming soon</a
            >
          </li>
          <li>
            <a class="nav-link" href="error.html"
              ><i class="icofont-ui-block"></i>404 error</a
            >
          </li>
          <li>
            <a class="nav-link" href="login.html"
              ><i class="icofont-logout"></i>logout</a
            >
          </li>
        </ul>
        <div class="nav-info-group">
          <div class="nav-info">
            <i class="icofont-ui-touch-phone"></i>
            <p>
              <small>call us</small>
              <span>(+880) 183 8288 389</span>
            </p>
          </div>
          <div class="nav-info">
            <i class="icofont-ui-email"></i>
            <p>
              <small>email us</small>
              <span>support@greeny.com</span>
            </p>
          </div>
        </div>
        <div class="nav-footer">
          <p>All Rights Reserved by <a href="#">Mironcoder</a></p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style>

</style>
