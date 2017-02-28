(function(){
    function Application() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
        }
        this.login = new view.components.Login();
    }

    Application.prototype.creationComplete = function() {
    };

    Application.prototype.service = function(requestVO) {
        this.delegate.service(requestVO);
    };

    Application.prototype.service_result = function(requestVO) {
        console.log(requestVO.type);
        switch (requestVO.type) {
            case AppConstants.DEVICE_READY:
                break;
            case AppConstants.AGENDA:
                break;
        }
    };

    Application.prototype.service_fault = function(requestVO) {
        console.error(requestVO.type);
        switch (requestVO.type) {
            case AppConstants.AGENDA:
                console.log('didnt return agenda');
                break;
        }
    };

    Application.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    Application.prototype.delegate = null;

    view.components.Application = Application;
}());