<template>
  <div>
    <div>
      <!-- <CartLeft /> -->
      <header class="position-sticky menu-top">
        <Navbar />
      </header>
      <router-view />
      <footer>
        <Footer />
      </footer>
    </div>
    <!-- NotificationGroup -->
    <NotificationGroup group="foo">
      <div class="notification-group center top">
        <div class="w-full max-w-sm">
          <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md"
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div
                :class="[
                  notification.type === 'success'
                    ? 'bg-green-500'
                    : notification.type === 'info'
                    ? 'bg-blue-500'
                    : notification.type === 'warning'
                    ? 'bg-yellow-500'
                    : notification.type === 'error'
                    ? 'bg-red-500'
                    : '',
                  'flex items-center justify-center w-12',
                ]"
              >
                <img
                    v-if="notificationIcons.hasOwnProperty(notification.type)"
                    :src="notificationIcons[notification.type]"
                    class="w-6 h-6" :style="{ filter: 'invert(1)' }"
                    alt="Notification Icon"
                  />
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span
                    class="font-semibold"
                    :class="[
                      notification.type === 'success'
                        ? 'text-green-500'
                        : notification.type === 'info'
                        ? 'text-blue-500'
                        : notification.type === 'warning'
                        ? 'text-yellow-500'
                        : notification.type === 'error'
                        ? 'text-red-500'
                        : '',
                    ]"
                    >{{ notification.title }}</span
                  >
                  <p class="text-sm text-gray-600">{{ notification.text }}</p>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>
    <!-- NotificationGroup -->
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import Footer from "./components/layouts/Footer.vue";
// import CartLeft from "./components/CartLeft.vue";

export default {
  name: "app",
  components: {Navbar, Footer},
  setup() {
    const notificationIcons = {
      success: require('@/assets/icon/done.svg'),
      info: require('@/assets/icon/info.svg'),
      warning: require('@/assets/icon/warning.svg'),
      error: require('@/assets/icon/error.svg')
    };

    return {
      notificationIcons,
    };
  },
};
</script>

<style lang="css">
</style>
