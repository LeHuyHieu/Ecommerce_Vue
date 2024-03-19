import { createStore } from "vuex"
import router from "@/router"
import AuthService from "@/services/AuthService"
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
        user: [],
        cartCount: 0,
        carts: JSON.parse(localStorage.getItem('carts')) || [],
        totalCart: 0,
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

        updateTotalCart(state, total) {
            state.totalCart = total;
        }
    },
    actions: {
        async login({ commit }, detail) {
            const { email, password } = detail
            try {
                await signInWithEmailAndPassword(auth, email, password)
                const user = await AuthService.getUser(auth.currentUser.uid)
                localStorage.setItem('user', JSON.stringify(user));
                commit('SET_USER', user);
                console.log(user);
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
            const { email, password, name } = detail
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                const userId = user.uid; 
                const newUser = {
                    name: name,
                    email: email,
                    role: "user", 
                    user_id: userId,
                };
                AuthService.create(email, name, userId);
                commit('SET_USER', auth.currentUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                alerts('success', 'Success', 'Đăng ký thành công.')
                router.push('/')
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
                    const userData = await AuthService.getUser(user.uid);
                    commit('SET_USER', userData)
                    localStorage.setItem('user', JSON.stringify(userData));
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
