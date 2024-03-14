// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/_variables.scss";`
            }
        }
    }
};
