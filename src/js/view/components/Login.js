(function(){

    function Login(delegate) {
        this.delegate = delegate;
        this.intervalId = null;
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.loader = document.getElementById("loader");
        this.signIn = document.getElementById("signIn");
        document.getElementById("signIn").addEventListener("click", this.signInWithCredentials.bind(this));
        document.getElementById("signOut").addEventListener("click", this.signOut.bind(this));

        this.renewAuthToken();

        this.username.value = "admin@realogy.com";
        this.password.value = "admin101!";
    }

    Login.prototype.signOut = function() {
        clearInterval(this.intervalId);
        localStorage.removeItem("authToken");
        document.getElementById("login").classList.remove("hidden");
        document.getElementById("main").classList.add("hidden");
        document.getElementById("profile").classList.add("hidden");
    };

    Login.prototype.setInterval = function() {
        this.intervalId = setInterval(Login.prototype.renewAuthToken.bind(this), 5 * 60 * 1000);
    };

    Login.prototype.renewAuthToken = function() {
        if(localStorage.getItem("authToken")) {
            this.delegate.service(new model.vo.RequestVO(localStorage.getItem("authToken"), AppConstants.RENEW_AUTH_TOKEN));
        } else {
            this.renewAuthToken_fail();
        }
    };

    Login.prototype.renewAuthToken_success = function(requestVO) {
        console.log(new Date());
        this.signInWithCredentials_success(requestVO);
    };

    Login.prototype.renewAuthToken_fail = function(requestVO) {
        document.getElementById("login").classList.remove("hidden");
        document.getElementById("main").classList.add("hidden");
        localStorage.removeItem("authToken");
    };

    Login.prototype.signInWithCredentials = function(event) {
        if(this.username.value.trim() != "" && this.password.value.trim() != "") {
            this.enableFields(false);
            location.hash = "#!/login";
        }
    };

    Login.prototype.signInWithCredentials_success = function(requestVO) {
        this.enableFields(true);
        localStorage.setItem("authToken", requestVO.getResultData().getElementsByTagName("authToken")[0].firstChild.nodeValue);
        document.getElementById("login").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");

        document.getElementById("invalid").classList.add("hidden");
        location.hash = "#!/brands";

        this.setInterval();
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