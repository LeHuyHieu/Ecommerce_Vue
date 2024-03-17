import { createStore } from "vuex"
import router from "@/router"
import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { notify } from "notiwind";

const alerts = (type, title, desc) => {
    notify(
        {
            group: "foo",
            title: title,
            position: "top-center",
            type: type,
            text: desc,
        },
        3000
    );
}

export default createStore({
    state: {
        user: null,
        cartCount: 0,
        carts: JSON.parse(localStorage.getItem('carts')) || [],
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },

        CLEAR_USER(state) {
            state.user = null
        },

        updateCartCount(state, count) {
            state.cartCount = count;
        },

        addToCart(state, cart) {
            state.carts.push(cart);
        },

        updateCartItem(state, payload) {
            const { index, cart } = payload;
            state.carts[index] = cart;
        },
    },
    actions: {
        async login({ commit }, detail) {
            const { email, password } = detail
            try {
                await signInWithEmailAndPassword(auth, email, password)
                commit('SET_USER', auth.currentUser)
                localStorage.setItem('user', JSON.stringify(auth.currentUser));
                alerts('success', 'Success', 'Đăng nhập thành công.')
                router.push('/')
            } catch (err) {
                switch (err.code) {
                    case 'auth/user-not-found':
                        alerts('error', 'Error', 'Tài khoản không tồn tại.')
                        break
                    case 'auth/wrong-password':
                        alerts('error', 'Error', 'Sai tài khoản hoặc mật khẩu.')
                        break
                    default:
                        alerts('error', 'Error', 'Có sự cố sảy ra.')
                        break
                }
            }
        },

        async register({ commit }, detail) {
            const { email, password } = detail
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                commit('SET_USER', auth.currentUser)
                alerts('success', 'Success', 'Đăng ký thành công.')
                router.push('/login')
            } catch (err) {
                switch (err.code) {
                    case 'auth/email-already-exists':
                        alerts('warning', 'Warning', 'Email đã được sử dụng.')
                        break
                    case 'auth/invalid-email':
                        alerts('warning', 'Warning', 'Email không hợp lệ.')
                        break
                    case 'auth/operation-not-allowed':
                        alerts('error', 'Error', 'Hoạt động không được phép.');
                        break
                    case 'auth/weak-password':
                        alerts('error', 'Error', 'Mật khẩu yếu.')
                        break
                    default:
                        alerts('error', 'Error', 'Có sự cố sảy ra.')
                        break
                }
            }
        },

        async logout({ commit }) {
            await signOut(auth)
            commit('CLEAR_USER')
            localStorage.removeItem('user');
            router.push('/login')
        },

        // kiểm tra đăng nhập
        fetchUser({ commit }) {
            auth.onAuthStateChanged(async user => {
                if (user === null) {
                    commit('CLEAR_USER')
                    localStorage.removeItem('user');
                } else {
                    commit('SET_USER', user)
                    localStorage.setItem('user', JSON.stringify(user));
                    if (router.isReady() && (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/register')) {
                        router.push('/')
                    }
                }
            })
        },

        addToCart({ commit }, cart) {
            commit('addToCart', cart);
        },

        updateCartItem({ commit }, payload) {
            commit('updateCartItem', payload);
        },
    },
})
