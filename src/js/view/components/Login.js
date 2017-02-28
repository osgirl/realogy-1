(function(){

    function Login() {
        this.delegate = null;
        document.getElementById("signIn").addEventListener("click", this.signIn_clickHandler.bind(this));
    }

    Login.prototype.signIn_clickHandler = function(event) {
        console.log("click");
    };

    Login.prototype.login = function() {

    };

    Login.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    view.components.Login = Login;

})();