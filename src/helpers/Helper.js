class Helper {
    formatPrice(price) {
        let val = (price / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    subToTal(data) {
        let price = 0;
        data.forEach(e => {
            price += e.price * e.quantity;
        })
        return price;
    }
}

export default new Helper();