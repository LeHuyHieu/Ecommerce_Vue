class AuthService {
    getCurentUser() {
        let user = JSON.parse(localStorage.getItem('user'));
    
        return user;
    }

    isLogin() {
        if (this.getCurentUser() !== null) {
            return true;
        }
        return false;
    }
}

export default new AuthService();