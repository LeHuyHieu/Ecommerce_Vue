<template lang="">
  <div class="home py-5">
    <div class="container-fluid">
      <h2 class="text-center text-4xl font-semibold mb-4">List Product</h2>
      <div class="table-responsevi border p-3 rounded">
        <div class="filter">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-12">
              <div class="form-group mb-3 position-relative">
                <input type="text" class="form-control rounded-pill" placeholder="Tìm kiếm" />
                <button class="btn btn-sm btn-search"><font-awesome-icon icon="search" /></button>
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-12 ml-auto">
              <div class="form-group mb-3 text-right">
                <button class="btn btn-danger rounded-pill px-3" @click="deleteAll"><font-awesome-icon icon="trash" /> All</button>
                <button class="btn btn-danger rounded-pill px-3 ml-2" @click="deleteMultiple"><font-awesome-icon icon="trash" /> Multiple</button>
              </div>
            </div>
          </div>
        </div>
        <table class="table mb-0 table-bordered">
          <thead class="thead-dark text-center">
            <tr>
              <th width="50px" class="text-center"><input type="checkbox" /></th>
              <th width="50px" class="text-center">Id</th>
              <th>Product name</th>
              <th>Category name</th>
              <th>Color</th>
              <th width="200px">Price</th>
              <th width="200px">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td class="align-middle text-center"><input type="checkbox" @change="getKey(item.key, item.url_image)" /></td>
              <td class="align-middle text-center">{{ index + 1 }}</td>
              <td class="align-middle"><div class="flex items-center"><img width="50px" class="border p-1 rounded mr-2" :src="item.url_image"> {{ item.name }}</div></td>
              <td class="text-center align-middle" :style="{ textTransform: 'capitalize' }">{{ item.category }}</td>
              <td class="text-center align-middle">
                <button class="btn border-2 border-light p-3" :style="{ backgroundColor: item.color }"></button>
              </td>
              <td class="text-center align-middle">${{ formatPrice(item.price) }}</td>
              <td class="text-center align-middle">
                <router-link :to="/edit-product/ + item.key" class="btn btn-sm btn-warning"><font-awesome-icon icon="edit" /> Edit</router-link>
                <button class="btn btn-sm btn-danger ml-2" @click="deleteItem(item.key, item.url_image)"><font-awesome-icon icon="trash" /> Delete</button>
              </td>
            </tr>
            <tr v-if="!products.length">
              <td colspan="6"><b>Khong co du lieu</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <div>
    <button @click="showNotification" class="bg-blue-500">Show Notification</button>
  </div> -->
</template>
<script>
import ProductService from "../services/ProductService";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  ref as firebaseRef,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
library.add(faSearch, faTrash, faEdit)
import { notify } from "notiwind"

export default {
  data() {
    return {
      products: [],
      keys: [],
      url_images:[],
    };
  },
  mounted() {
    this.getProductData();
  },
  methods: {
    showNotification(type, title, description) {
      notify({
        group: "foo",
        title: title,
        position: "top-center", 
        type: type,
        text: description
      }, 3000);
    },

    //push key and url
    getKey(key, url) {
      this.keys.push(key);
      this.url_images.push(url)
    },
    //delete file
    async deleteFile (url_image) {
      try {
        const fileUrl = url_image;
        const fileRef = firebaseRef(storage, fileUrl);
        await deleteObject(fileRef);
        console.log("delete file successfully");
      } catch (error) {
        console.error("error delete file:", error);
      }
    },
    //get all products
    async getProductData() {
      try {
        const products = await ProductService.getAll();
        this.products = products;
      } catch (error) {
        console.error("Error getting product data:", error);
      }
    },
    //delete all products
    async deleteAll () {
      const confirm = window.confirm("Are you sure you want to delete everything?");
      if (confirm) {
        this.products.forEach(async (item) => {
          try {
              //delete image by url
              await this.deleteFile(item.url_image);
              console.log('Deleted file successfully');
          } catch (error) {
              console.error(`Error deleting file ${error}`);
          }
        });
        try {
          //delete all products
          await ProductService.deleteAll();
          this.showNotification("success", "Success", "Delete all product successfully")
          //get product
          this.getProductData();
        } catch (err) {
          console.log('Error deleting all products:', err);
        }
      }
    },
    //delete multiple products  
    async deleteMultiple() {
      const confirm = window.confirm("Are you sure you want to delete everything?");
      console.log(this.keys);
      console.log(this.url_images);
      if (confirm) {
        this.url_images.forEach(async (url) => {
          try {
              //delete image by url
              await this.deleteFile(url);
              console.log('Deleted file successfully');
          } catch (error) {
              console.error(`Error deleting file ${error}`);
          }
        })
        try {
          //delete product by key
          await ProductService.deleteMultiple(this.keys);
          this.showNotification("success", "Success", "Delete mutiple product successfully")
          //get product
          this.getProductData();
        } catch (err) {
          console.log('Error deleting all products:', err);
        }
      }
    },
    //delete item product
    async deleteItem(key, url_image) {
      const confirm = window.confirm("Are you sure you want to delete everything?");
      if (confirm) {
        //delete image
        this.deleteFile(url_image);
        try {
          //delete product
          await ProductService.delete(key);
          this.showNotification("success", "Success", "Delete item product successfully")
          //get product
          this.getProductData();
        } catch (err) {
          console.error("Error deleting item:", err);
        }
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style lang=""></style>
