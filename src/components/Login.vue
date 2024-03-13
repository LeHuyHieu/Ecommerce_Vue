<template lang="">
  <main class="auth">
    <div class="forms">
      <form class="login" @submit.prevent="login">
        <div class="card">
          <div class="card-header bg-white border-0">
            <h4 class="mb-0 text-center">Login</h4>
          </div>
          <div class="card-body">
            <div class="form-group mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control rounded-pill"
                placeholder="Enter Email"
                v-model="login_form.email"
              />
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control rounded-pill"
                placeholder="Enter password"
                v-model="login_form.password"
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn-auth">Login</button>
            </div>
            <hr />
            <div class="text-center">
              Do not have an account?
              <router-link to="/register">Register</router-link>
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
