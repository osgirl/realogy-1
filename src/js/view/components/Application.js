(function(){

    function Application(delegate) {
        this.delegate = delegate;
        location.hash = "";
        window.onhashchange = this.onhashchange.bind(this);
    }

    Application.prototype.creationComplete = function() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
            this.requestConfirm = self.requestConfirm.bind(self);
            this.requestAlert = self.requestAlert.bind(self);
        }
        var delegate = new IDelegate();
        this.login = new view.components.Login(delegate);
        this.brand = new view.components.Brand(delegate);
        this.product = new view.components.Product(delegate);
        this.popup = new view.components.Popup();
    };

    Application.prototype.service = function(requestVO) {
        this.delegate.service(requestVO);
    };

    Application.prototype.requestConfirm = function(requestVO, message) {
        var self = this;
        this.popup.requestConfirm(requestVO, message)
            .then(function(requestVO){self.service(requestVO)});
    };

    Application.prototype.requestAlert = function(requestVO, message) {
        var self = this;
        this.popup.requestAlert(requestVO, message)
            .then(function(){});
    };

    Application.prototype.onhashchange = function(event) {
        this.login.onhashchange(event);
        this.brand.onhashchange(event);
        this.product.onhashchange(event);
    };

    Application.prototype.service_result = function(requestVO) {
        console.log(requestVO.getRequestType());
        switch (requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                this.login.signInWithCredentials_success(requestVO);
                break;
            case AppConstants.RENEW_AUTH_TOKEN:
                this.login.renewAuthToken_success(requestVO);
                break;
            case AppConstants.GET_BRANDS:
                this.brand.get_success(requestVO);
                this.product.setBrands(requestVO);
                break;
            case AppConstants.POST_BRANDS:
                this.brand.post_success(requestVO);
                this.product.appendBrand(requestVO.getResultData());
                break;
            case AppConstants.DELETE_BRANDS:
                this.brand.delete_success(requestVO);
                this.product.deleteBrand(requestVO.getRequestData());
                break;
            case AppConstants.GET_PRODUCTS:
                this.product.get_success(requestVO);
                break;
            case AppConstants.DELETE_PRODUCTS:
                this.product.delete_success(requestVO);
                break;
        }
    };

    Application.prototype.service_fault = function(requestVO) {
        console.error(requestVO.getRequestType());
        switch (requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                this.login.signInWithCredentials_fail(requestVO);
                break;
            case AppConstants.RENEW_AUTH_TOKEN:
                this.login.renewAuthToken_fail(requestVO);
                break;
            default:
                console.log(requestVO.getResultData());
                this.popup.requestAlert(requestVO, requestVO.getResultData())
                    .then(function(){});
                break;
        }
    };

    Application.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    view.components.Application = Application;

}());