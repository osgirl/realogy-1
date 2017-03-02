(function(){

    function Login() {
        this.delegate = null;
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.loader = document.getElementById("loader");
        this.signIn = document.getElementById("signIn");
        document.getElementById("signIn").addEventListener("click", this.login.bind(this));

        this.username.value = "admin@realogy.com";
        this.password.value = "admin101!";
    }

    Login.prototype.login = function(event) {
        if(this.username.value.trim() != "" && this.password.value.trim() != "") {
            this.username.setAttribute("disabled", "disabled");
            this.password.setAttribute("disabled", "disabled");
            this.signIn.setAttribute("disabled", "disabled");
            this.loader.classList.remove("invisible");
            this.delegate.service(new model.vo.RequestVO({username: this.username.value.trim(), password: this.password.value.trim()}, AppConstants.SIGN_IN_WITH_CREDENTIALS));
        }
    };

    Login.prototype.login_success = function(requestVO) {
        var doc = requestVO.getResultData();
        localStorage.setItem("authToken", doc.getElementsByTagName("authToken")[0].firstChild);
        document.getElementById("login").classList.add("hidden");

        // set interval on renewal
    };

    Login.prototype.login_fail = function(requestVO) {

    };

    Login.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    view.components.Login = Login;

})();