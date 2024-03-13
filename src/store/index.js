import { createStore } from "vuex"
import router from "../router"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

export default createStore({
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        
        CLEAR_USER(state) {
            state.user = null
        },
    },
    actions: {
        async login({ commit }, detail) {
            const { email, password } = detail
            try {
                await signInWithEmailAndPassword(auth, email, password)
                commit('SET_USER', auth.currentUser)
                localStorage.setItem('user', JSON.stringify(auth.currentUser));
                router.push('/')
            } catch (err) {
                switch (err.code) {
                    case 'auth/user-not-found':
                        alert('user not found')
                        break
                    case 'auth/wrong-password':
                        alert('wrong password')
                        break
                    default:
                        alert('something went wrong')
                        break
                }
            }
        },

        async register({ commit }, detail) {
            const { email, password } = detail
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                commit('SET_USER', auth.currentUser)
                localStorage.setItem('user', JSON.stringify(auth.currentUser));
                router.push('/')
            } catch (err) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        alert('email already in use')
                        break
                    case 'auth/invalid-email':
                        alert('invalid email')
                        break
                    case 'auth/operation-not-allowed':
                        alert('operation-not-allowed');
                        break
                    case 'auth/weak-password':
                        alert('weak password')
                        break
                    default:
                        alert('something went wrong')
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
    },
})
