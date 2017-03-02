(function(){

    function Application() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
        }
        var delegate = new IDelegate();
        this.login = new view.components.Login(delegate);
        this.brand = new view.components.Brand(delegate);
        location.hash = "";
        window.onhashchange = this.onhashchange.bind(this);
    }

    Application.prototype.onhashchange = function(event) {
        this.login.onhashchange(event);
        this.brand.onhashchange(event);
    };

    Application.prototype.creationComplete = function() {
    };

    Application.prototype.service = function(requestVO) {
        this.delegate.service(requestVO);
    };

    Application.prototype.service_result = function(requestVO) {
        console.log(requestVO.getRequestType());
        switch (requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                this.login.signInWithCredentials_success(requestVO);
                break;
            case AppConstants.GET_BRANDS:
                this.brand.brandGet_success(requestVO);
                break;
        }
    };

    Application.prototype.service_fault = function(requestVO) {
        console.error(requestVO.getRequestType());
        console.log(requestVO.getResultData());
        switch (requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                this.login.signInWithCredentials_fail(requestVO);
                break;
        }
    };

    Application.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    Application.prototype.delegate = null;

    view.components.Application = Application;

}());