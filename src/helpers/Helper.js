import { notify } from "notiwind";

class Helper {
    formatPrice(price) {
        let val = (price / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    addToCart(cart) {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let flag = false;
        carts.forEach((element, index) => {
            if (element.key === cart.key) {
                carts[index].quantity += cart.quantity ? cart.quantity : 1;
                notify({
                    group: "foo",
                    title: "Success",
                    position: "top-center",
                    type: "success",
                    text: "Đã tăng số lượng sản phẩm.",
                },3000)
                flag = true;
                return;
            }
        });
        console.log(carts);
        if (!flag) {
            cart.quantity = cart.quantity ? cart.quantity : 1;
            notify({
                group: "foo",
                title: "Success",
                position: "top-center",
                type: "success",
                text: "Đã thêm sản phẩm vào giỏ hàng.",
            },3000)
            carts.push(cart);
        }
        localStorage.setItem('carts', JSON.stringify(carts));
    }
}

export default new Helper();