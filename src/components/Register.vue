<template lang="">
  <main class="auth">
    <div class="forms">
      <form class="register" @submit.prevent="register">
        <div class="card">
          <div class="card-header bg-white border-0">
            <h4 class="mb-0 text-center">Register</h4>
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
                class="form-control rounded-pill"
                placeholder="Enter Email"
                v-model="register_form.email"
              />
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control rounded-pill"
                placeholder="Enter password"
                v-model="register_form.password"
              />
            </div>
            <!-- <div class="form-group mb-3">
              <label class="d-inline-flex align-item-center justify-content-end w-100" for="agree"><input type="checkbox" class="mr-2" id="agree" /> I agree to all terms</label>
            </div> -->
            <div class="text-center">
              <button class="btn-auth">Register</button>
            </div>
            <hr />
            <div class="text-center">
              Already have an account?
              <router-link to="/login">Login</router-link>
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

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      register_form,
      register,
    };
  },
};
</script>
<style></style>
