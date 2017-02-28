(function(){

    function Login() {
        this.delegate = null;
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.loader = document.getElementById("loader");
        this.signIn = document.getElementById("signIn");
        document.getElementById("signIn").addEventListener("click", this.signIn_clickHandler.bind(this));
    }

    Login.prototype.signIn_clickHandler = function(event) {
        if(this.username.value.trim() != "" && this.password.value.trim() != "") {
            this.username.setAttribute("disabled", "disabled");
            this.password.setAttribute("disabled", "disabled");
            this.signIn.setAttribute("disabled", "disabled");
            this.loader.classList.remove("invisible");
            this.delegate.service(new model.vo.RequestVO(new model.vo.RequestData({username: this.username.value.trim(), password: this.password.value.trim()},
                AppConstants.LOGIN)));
        }
    };

    Login.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    view.components.Login = Login;

})();