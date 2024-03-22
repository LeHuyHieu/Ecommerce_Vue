import { createStore } from "vuex"
import router from "@/router"
import AuthService from "@/services/AuthService"
import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { notify } from "notiwind";
import bcrypt from 'bcryptjs';

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
        user: JSON.parse(localStorage.getItem('user')) || [],
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
        cartCount: 0,
        carts: JSON.parse(localStorage.getItem('carts')) || [],
        totalCart: 0,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },

        SET_CURRENT_USER(state, current_user) {
            state.currentUser = current_user;
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
                localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
                commit('SET_USER', user);
                commit('SET_CURRENT_USER', auth.currentUser);
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
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);
                AuthService.create(email, name, userId, hashedPassword);
                localStorage.setItem('user', JSON.stringify(newUser));
                localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
                commit('SET_USER', newUser);
                commit('SET_CURRENT_USER', auth.currentUser);
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
            commit('SET_CURRENT_USER', null);
            localStorage.removeItem('user');
            localStorage.removeItem('currentUser'); 
            router.push('/login')
        },

        // kiểm tra đăng nhập
        fetchUser({ commit }) {
            auth.onAuthStateChanged(async user => {
                if (user === null) {
                    commit('CLEAR_USER')
                    commit('SET_CURRENT_USER', null);
                    localStorage.removeItem('user');
                    localStorage.removeItem('currentUser'); 
                } else {
                    try {
                        const userData = await AuthService.getUser(user.uid);
                        localStorage.setItem('user', JSON.stringify(userData));
                        localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
                        commit('SET_USER', user)
                        commit('SET_CURRENT_USER', auth.currentUser);
                        if (router.isReady() && (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/register')) {
                            router.push('/')
                        }
                    } catch (err) {
                        console.error(err);
                        alerts('error', 'Error', 'Có sự cố sảy ra khi tải dữ liệu người dùng.');
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
