<template lang="">
  <div class="home py-5">
    <div class="container-fluid px-5">
      <h2 class="text-center text-4xl font-semibold mb-4">List Product</h2>
      <div class="relative overflow-x-auto border shadow-md sm:rounded-lg py-3">
        <div class="flex sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center pb-4 px-3">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              @input="handleSearch"
            />
          </div>
          <div class="form-group ml-2 w-44">
            <select @change="changeItemPerPage($event.target.value)" v-model="itemsPerPage" class="block w-full border border-gray-300 bg-gray-50 rounded-md py-1.5 text-gray-900 shadow-sm focus:ring-1 focus:ring-inset focus:ring-indigo-600">
              <option value="2">Choose..</option>
              <option value="5">05</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div class="form-group text-right ml-auto">
            <button
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="showModalDeleteAll"
            >
              <font-awesome-icon icon="trash" /> All
            </button>
            <confirm-delete-modal
              :show="showDeleteAllModal"
              title="Confirm Deletion"
              message="Are you sure you want to delete all products?"
              @close="hideModalDeleteAll"
              @delete="deleteAll"
            />
            <button
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 ml-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="showModalDeleteMutiple"
            >
              <font-awesome-icon icon="trash" /> Multiple
            </button>
            <confirm-delete-modal
              :show="showDeleteMutipleModal"
              title="Confirm Deletion"
              message="Are you sure you want to delete the selected products?"
              @close="hideModalDeleteMutiple"
              @delete="deleteMultiple"
            />
          </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    @change="allCheck"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">Product name</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Color</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" width="200px" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in paginatedItems"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    :id="'checkbox-table-search-'+index"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                </div>
              </td>
              <td class="align-middle px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div class="flex items-center">
                  <img
                    width="50px"
                    class="border p-1 rounded mr-2"
                    :src="item.url_image"
                  />
                  {{ item.name }}
                </div>
              </td>
              <td 
                class="align-middle px-6 py-4"
                :style="{ textTransform: 'capitalize' }">
                {{ item.category }}
              </td>
              <td class="align-middle px-6 py-4">
                <button
                  class="btn border-2 rounded-full border-light p-2"
                  :style="{ backgroundColor: item.color }"
                ></button>
              </td>
              <td class="align-middle px-6 py-4">
                ${{ $helpers.formatPrice(item.price) }}
              </td>
              <td class="align-middle px-6 py-4">
                <router-link
                  :to="/edit-product/ + item.key"
                  class="btn btn-sm btn-warning"
                  ><font-awesome-icon icon="edit" /> Edit</router-link
                >
                <button
                  class="btn btn-sm hover:text-red-600 ml-2"
                  @click="showModalDeleteItem"
                >
                  <font-awesome-icon icon="trash" /> Delete
                </button>
                <confirm-delete-modal
                  :show="showDeleteItemModal"
                  title="Confirm Deletion"
                  message="Are you sure you want to delete the current product?"
                  @close="hideModalDeleteItem"
                  @delete="deleteItem(item.key, item.url_image)"
                />
              </td>
            </tr>
            <tr v-if="!paginatedItems.length">
              <td class="align-middle px-6 py-4" colspan="6"><b>Khong co du lieu</b></td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="flex items-center sm:flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 sm:mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{(currentPage - 1) * itemsPerPage + 1}}-{{Math.min(currentPage * itemsPerPage, productsAll.length)}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{productsAll.length}}</span></span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                  <a @click="prevPage" href="javascript:;" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border rounded-l border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
              </li>
              <li v-for="(page, index) in totalPages" :key="index">
                  <a @click="getPage(page)" href="javascript:;" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :class="page == currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'" >{{page}}</a>
              </li>
              <li>
                <a @click="nextPage" href="javascript:;" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-r rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
              </li>
          </ul>
      </nav>
    </div>
  </div>
  <!-- <div>
    <button @click="showNotification" class="bg-blue-500">Show Notification</button>
  </div> -->
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import ProductService from "@/services/ProductService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ref as firebaseRef, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";
import ConfirmDeleteModal from '@/components/ConfirmDelete.vue';

library.add(faSearch, faTrash, faEdit);
import { notify } from "notiwind";

export default {
  components: {ConfirmDeleteModal},
  data() {
    return {
      products: [],
      url_images: [],
      keys: [],
      showDeleteAllModal: false,
      showDeleteMutipleModal: false,
      showDeleteItemModal: false,
    };
  },
  methods: {
    showModalDeleteAll() {
      this.showDeleteAllModal = true;
    },
    hideModalDeleteAll() {
      this.showDeleteAllModal = false;
    },
    showModalDeleteMutiple() {
      this.showDeleteMutipleModal = true;
    },
    hideModalDeleteMutiple() {
      this.showDeleteMutipleModal = false;
    },
    showModalDeleteItem() {
      this.showDeleteItemModal = true;
    },
    hideModalDeleteItem() {
      this.showDeleteItemModal = false;
    },
    showNotification(type, title, description) {
      notify(
        {
          group: "foo",
          title: title,
          position: "top-center",
          type: type,
          text: description,
        },
        3000
      );
    },
    allCheck(event) {
      const isChecked = event.target.checked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="checkbox-table-search-"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
    },
    //delete file
    async deleteFile(url_image) {
      try {
        const fileUrl = url_image;
        const fileRef = firebaseRef(storage, fileUrl);
        await deleteObject(fileRef);
        console.log("delete file successfully");
      } catch (error) {
        console.error("error delete file:", error);
      }
    },
    //delete all products
    async deleteAll() {
      const confirm = window.confirm(
        "Are you sure you want to delete all products?"
      );
      if (confirm) {
        this.products.forEach(async (item) => {
          try {
            //delete image by url
            await this.deleteFile(item.url_image);
            console.log("Deleted file successfully");
          } catch (error) {
            console.error(`Error deleting file ${error}`);
          }
        });
        try {
          //delete all products
          await ProductService.deleteAll();
          this.showNotification(
            "success",
            "Success",
            "Delete all product successfully"
          );
          this.showDeleteAllModal = false;
          //get product
          this.getProductData();
        } catch (err) {
          console.log("Error deleting all products:", err);
        }
      }
    },
    //delete multiple products
    async deleteMultiple() {
      const confirm = window.confirm(
        "Are you sure you want to delete the selected products?"
      );
      if (confirm) {
        this.url_images = [];
        this.keys = [];
        this.products.forEach((item, index) => {
          const checkbox = document.getElementById(`checkbox-table-search-${index}`);
          if (checkbox.checked) {
            this.url_images.push(item.url_image)
            this.keys.push(item.key)
          }
        });
        this.url_images.forEach(async (url) => {
          try {
            //delete image by url
            await this.deleteFile(url);
            console.log("Deleted file successfully");
          } catch (error) {
            console.error(`Error deleting file ${error}`);
          }
        });
        try {
          //delete product by key
          await ProductService.deleteMultiple(this.keys);
          this.showNotification(
            "success",
            "Success",
            "Delete mutiple product successfully"
          );
          this.showDeleteMutipleModal = false;
          //get product
          this.getProductData();
        } catch (err) {
          console.log("Error deleting all products:", err);
        }
      }
    },
    //delete item product
    async deleteItem(key, url_image) {
      const confirm = window.confirm(
        "Are you sure you want to delete the current product?"
      );
      if (confirm) {
        //delete image
        this.deleteFile(url_image);
        try {
          //delete product
          await ProductService.delete(key);
          this.showNotification(
            "success",
            "Success",
            "Delete item product successfully"
          );
          this.showDeleteItemModal = false;
          //get product
          this.getProductData();
        } catch (err) {
          console.error("Error deleting item:", err);
        }
      }
    }
  },
  setup() {
    const productsAll = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(2);
    const searchText = ref('');

    const getProductData = async () => {
      try {
        const products = await ProductService.getAll();
        productsAll.value = products;
      } catch (error) {
        console.error("Error getting product data:", error);
      }
    };
    
    const changeItemPerPage = (perPage) => {
      itemsPerPage.value = perPage
      currentPage.value = 1;
    }
    
    const handleSearch = (event) => {
      searchText.value = event.target.value;
      currentPage.value = 1;
    };

    const totalPages = computed(() => {
      const term = searchText.value.toLowerCase();
      const filteredItems = productsAll.value.filter(product => {
        return product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
      });
      return Math.ceil(filteredItems.length / itemsPerPage.value);
    });

    const paginatedItems = computed(() => {
      const term = searchText.value.toLowerCase();
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = currentPage.value * itemsPerPage.value;
      const filteredItems = productsAll.value.filter(product => {
        return product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
      });
      return filteredItems.slice(startIndex, endIndex);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const getPage = (page) => {
      currentPage.value = page;
    };

    onMounted(async () => {
      await getProductData();
    });

    return {
      productsAll,
      currentPage,
      totalPages,
      paginatedItems,
      itemsPerPage,
      nextPage,
      prevPage,
      getPage,
      changeItemPerPage,
      handleSearch,
      getProductData 
    };
  },
};
</script>
<style lang=""></style>
