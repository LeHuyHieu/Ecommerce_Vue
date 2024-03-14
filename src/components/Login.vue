<template lang="">
  <main class="auth">
    <div class="forms">
      <form class="login" @submit.prevent="login">
        <div class="card p-5 rounded-md">
          <div class="card-header bg-white border-0">
            <h4 class="mb-0 text-center text-4xl font-semibold">Login</h4>
          </div>
          <div class="card-body">
            <div class="form-group mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="block p-2 pl-5 text-sm rounded-full text-gray-900 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Email"
                v-model="login_form.email"
              />
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="block p-2 pl-5 text-sm rounded-full text-gray-900 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter password"
                v-model="login_form.password"
              />
            </div>
            <p class="text-right mb-4">
              <a class="text-blue-600 text-xs">Forgot passsword?</a>
            </p>
            <div class="text-center mb-4">
              <button type="submit" class="btn-auth">Login</button>
            </div>
            <hr />
            <div class="text-center mt-4">
              Do not have an account?
              <router-link class="text-blue-600" to="/register">Register</router-link>
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
  name: "login",
  setup() {
    const login_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch('login', login_form.value)
    }

    return {
      login_form,
      // store,
      login,
    };
  },
};
</script>
<style></style>
