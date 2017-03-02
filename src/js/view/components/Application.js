(function(){
    function Application() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
        }
        this.login = new view.components.Login();
        this.login.setDelegate(new IDelegate());
    }

    Application.prototype.creationComplete = function() {
    };

    Application.prototype.service = function(requestVO) {
        this.delegate.service(requestVO);
    };

    Application.prototype.service_result = function(requestVO) {
        console.log(requestVO.getRequestType());
        switch (requestVO.getRequestType()) {
            case AppConstants.LOGIN:
                this.login.login_success(requestVO);
                break;
            case AppConstants.AGENDA:
                break;
        }
    };

    Application.prototype.service_fault = function(requestVO) {
        console.error(requestVO.getRequestType());
        switch (requestVO.getRequestType()) {
            case AppConstants.LOGIN:
                this.login.login_fail(requestVO);
                break;
        }
    };

    Application.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    Application.prototype.delegate = null;

    view.components.Application = Application;
}());