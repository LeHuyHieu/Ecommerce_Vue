class Helper {
    formatPrice(price) {
        let val = (price / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

export default new Helper();