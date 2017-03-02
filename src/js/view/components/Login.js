(function(){

    function Login(delegate) {
        this.delegate = delegate;
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.loader = document.getElementById("loader");
        this.signIn = document.getElementById("signIn");
        document.getElementById("signIn").addEventListener("click", this.signInWithCredentials.bind(this));

        this.username.value = "admin@realogy.com";
        this.password.value = "admin101!";
    }

    Login.prototype.signInWithCredentials = function(event) {
        if(this.username.value.trim() != "" && this.password.value.trim() != "") {
            this.enableFields(false);
            location.hash = "#!/login";
        }
    };

    Login.prototype.signInWithCredentials_success = function(requestVO) {
        this.enableFields(true);
        localStorage.setItem("authToken", requestVO.getResultData().getElementsByTagName("authToken")[0].firstChild);
        document.getElementById("login").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");

        document.getElementById("invalid").classList.add("hidden");
        location.hash = "#!/brands";
        // set interval for renewal
    };

    Login.prototype.signInWithCredentials_fail = function(requestVO) {
        this.enableFields(true);
        document.getElementById("invalid").classList.remove("hidden");
    };

    Login.prototype.enableFields = function(enabled) {
        enabled ? this.username.removeAttribute("disabled") : this.username.setAttribute("disabled", "disabled");
        enabled ? this.password.removeAttribute("disabled") : this.password.setAttribute("disabled", "disabled");
        enabled ? this.signIn.removeAttribute("disabled") : this.signIn.setAttribute("disabled", "disabled");
        enabled ? this.loader.classList.add("hidden") : this.loader.classList.remove("invisible");
    };

    Login.prototype.onhashchange = function(event) {
        if(location.hash.indexOf("/login") == -1) return;
        switch(location.hash.slice(2)) {
            case "/login":
                this.delegate.service(new model.vo.RequestVO({username: this.username.value.trim(), password: this.password.value.trim()}, AppConstants.SIGN_IN_WITH_CREDENTIALS));
            break;
        }
    };

    view.components.Login = Login;

})();