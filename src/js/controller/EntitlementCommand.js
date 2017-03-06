(function(){

    function EntitlementCommand(){
        puremvc.SimpleCommand.call(this);
    }

    EntitlementCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    EntitlementCommand.prototype.constructor = EntitlementCommand;

    EntitlementCommand.prototype.execute = function(notification) {
        var requestVO = notification.getBody();
        var serviceRequest = new model.request.ServiceRequest(requestVO, this.result, this);
        var serviceProxy = this.facade.retrieveProxy(model.ServiceProxy.NAME);

        switch(requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                serviceProxy.signInWithCredentials(serviceRequest);
                break;
            case AppConstants.RENEW_AUTH_TOKEN:
                serviceProxy.renewAuthToken(serviceRequest);
                break;
            default:
                console.log("Unknown Request - EntitlementCommand", requestVO);
                break;
        }
    };

    EntitlementCommand.prototype.result = function(notification) {
        var serviceRequest = notification.getBody();
        switch (notification.getName()) {
            case model.request.ServiceRequest.RESULT:
                this.sendNotification(ApplicationFacade.BRAND_RESULT, serviceRequest.getRequestVO());
                break;
            case model.request.ServiceRequest.FAULT:
                this.sendNotification(ApplicationFacade.BRAND_FAULT, serviceRequest.getRequestVO());
                break;
        }
    };

    controller.EntitlementCommand = EntitlementCommand;

}());