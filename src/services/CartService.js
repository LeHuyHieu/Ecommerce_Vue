import { notify } from "notiwind";
import store from '@/store';

class CartService {
    getCart() {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        store.commit('updateCartCount', carts.length);
        store.state.carts = carts;
        return carts ? carts : [];
    }

    addToCart(cart) {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let flag = false;
        carts.forEach((element, index) => {
            if (element.key === cart.key) {
                carts[index].quantity = cart.quantity ? element.quantity + cart.quantity : 1;
                this.updateCartItem(index, carts[index])
                notify({
                    group: "foo",
                    title: "Success",
                    position: "top-center",
                    type: "success",
                    text: "Đã tăng số lượng sản phẩm.",
                }, 3000)
                flag = true;
            }
        });
        if (flag === false) {
            cart.quantity = cart.quantity ? cart.quantity : 1;
            notify({
                group: "foo",
                title: "Success",
                position: "top-center",
                type: "success",
                text: "Đã thêm sản phẩm vào giỏ hàng.",
            }, 3000)
            carts.push(cart);
            store.dispatch('addToCart', cart);
        }
        localStorage.setItem('carts', JSON.stringify(carts));
        store.commit('updateCartCount', carts.length);
        store.commit('updateTotalCart', this.updateTotalCart());
    }

    updateCartItem(index, cart) {
        let carts = this.getCart();
        carts[index] = cart;
        localStorage.setItem('carts', JSON.stringify(carts));
        store.commit('updateCartItem', { index, cart });
    }

    removeCart(id) {
        let carts = JSON.parse(localStorage.getItem("carts"));
        for (let i = 0; i < carts.length; i++) {
            if (i == id) {
                carts.splice(i, 1);
            }
        }
        carts = JSON.stringify(carts);
        localStorage.setItem("carts", carts);
        store.commit('updateCartCount', carts.length);
        store.commit('updateTotalCart', this.updateTotalCart());
        store.state.carts = carts;
    }

    updateCartLess(index) {
        let carts = this.getCart();
        carts.forEach((e, i) => {
            if (index == i) {
                if (e.quantity > 1) {
                    carts[i].quantity = e.quantity - 1;
                } else {
                    carts.splice(i, 1)
                }
            }
        })
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    updateCartPlus(index) {
        let carts = this.getCart();
        carts.forEach((e, i) => {
            if (index == i) {
                carts[i].quantity = e.quantity + 1;
            }
        })
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    updateTotalCart() {
        let total = 0;
        let carts = this.getCart();
        carts.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }
}

export default new CartService();