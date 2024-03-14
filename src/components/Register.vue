<template lang="">
  <main class="auth">
    <div class="forms">
      <form class="register" @submit.prevent="register">
        <div class="card p-5 rounded-md">
          <div class="card-header bg-white border-0">
            <h4 class="mb-0 text-center text-4xl font-semibold">Register</h4>
          </div>
          <div class="card-body">
            <!-- <div class="form-group mb-3">
              <label class="form-label">Full name</label>
              <input type="text" class="form-control" v-model="register_form.fullname" />
            </div> -->
            <div class="form-group mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="block p-2 pl-5 text-sm rounded-full text-gray-900 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Email"
                v-model="register_form.email"
              />
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="block p-2 pl-5 text-sm rounded-full text-gray-900 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter password"
                v-model="register_form.password"
              />
            </div>
            <div class="form-group text-right mb-3">
              <label class="d-inline-flex align-item-center justify-content-end w-100 text-sm" for="agree"><input @change="changeAgree" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2" id="agree" /> I agree to all terms</label>
            </div>
            <div class="text-center mb-4">
              <button class="btn-auth" :disabled="!agree">Register</button>
            </div>
            <hr />
            <div class="text-center mt-4">
              Already have an account?
              <router-link class="text-blue-600" to="/login">Login</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "register",
  setup() {
    const register_form = ref({});
    const store = useStore();
    const agree = ref(false);
    console.log(agree);

    const changeAgree = () => {
      agree.value = !agree.value;
    };

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      register_form,
      register,
      agree,
      changeAgree
    };
  },
};
</script>
<style></style>
