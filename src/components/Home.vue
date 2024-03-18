<template lang="">
  <div class="home py-10">
    <div class="container mx-auto">
      <div class="lg:w-11/12 mx-auto">
        <h2 class="text-3xl text-center sm:text-left font-semibold mb-5">Home</h2>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-y-16 gap-x-6">
        <div class="card mx-auto" v-for="(product, index) in productsAll" :key="index">
          <div
            class="w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <router-link :to="'/detail-product/'+product.key" class="link-image">
              <img
                class="p-8 rounded-t-lg"
                :src="product.url_image"
                alt="product image"
              />
            </router-link>
            <div class="px-5 pb-5">
              <router-link :to="'/detail-product/'+product.key" class="text-center">
                <h5 class="text-xl font-semibold line-clamp-2 tracking-tight text-gray-900 dark:text-white">
                  {{product.name}}
                </h5>
              </router-link>
              <p class="line-clamp-2 text-center">
                {{product.desc}}
              </p>
              <div class="flex items-center justify-between mt-2.5 mb-5">
                <span class="text-lg inline-block font-bold text-gray-900 dark:text-white">${{$helpers.formatPrice(product.price)}}</span>
                <div class="flex items-center">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                  </div>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button @click="addToCart(product)" class="text-white shadow-md w-2/4 mr-2 glide-effect bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none hover:text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><font-awesome-icon icon="shopping-cart" /> <span class="ml-2">Add </span></button>
                <router-link  :to="'/detail-product/'+product.key" class="text-white shadow-md w-2/4 ml-2 glide-effect bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none hover:text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><font-awesome-icon icon="eye" /> <span class="ml-2">View </span></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductService from "@/services/ProductService";
import CartService from "@/services/CartService";
import { onMounted, ref } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faEye);

export default {
  setup() {
    const productsAll = ref([]);

    const getProductData = async () => {
      try {
        const products = await ProductService.getHomeLimitProducts();
        productsAll.value = products;
      } catch (error) {
        console.error("Error getting product data:", error);
      }
    };

    const addToCart = (cart) => {
      cart.quantity = 1;
      CartService.addToCart(cart);
    }

    onMounted(async () => {
      await getProductData();
    });

    return {
      productsAll,
      addToCart
    }
  }
};
</script>
<style lang="css">
.line-clamp-2 {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  min-height: 50px;
}
.line-clamp-1 {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
}
a.link-image {
  min-height: 300px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
