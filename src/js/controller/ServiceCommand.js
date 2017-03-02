(function(){

    function ServiceCommand(){
        puremvc.SimpleCommand.call(this);
    }

    ServiceCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    ServiceCommand.prototype.constructor = ServiceCommand;

    ServiceCommand.prototype.execute = function(notification) {
        var requestVO = notification.getBody();
        var serviceRequest = new model.request.ServiceRequest(requestVO, this.result, this);
        var serviceProxy = this.facade.retrieveProxy(model.ServiceProxy.NAME);

        switch(requestVO.getRequestType()) {
            case AppConstants.SIGN_IN_WITH_CREDENTIALS:
                serviceProxy.login(serviceRequest);
                break;
            case AppConstants.GET_BRANDS:
                serviceProxy.getBrands(serviceRequest);
                break;
            case AppConstants.POST_BRANDS:
                serviceProxy.postBrands(serviceRequest);
                break;
            case AppConstants.DELETE_BRANDS:
                serviceProxy.deleteBrands(serviceRequest);
                break;
        }
    };

    ServiceCommand.prototype.result = function(notification) {
        var serviceRequest = notification.getBody();
        switch (notification.getName()) {
            case model.request.ServiceRequest.RESULT:
                this.sendNotification(ApplicationFacade.SERVICE_RESULT, serviceRequest.getRequestVO());
                break;
            case model.request.ServiceRequest.FAULT:
                this.sendNotification(ApplicationFacade.SERVICE_FAULT, serviceRequest.getRequestVO());
                break;
        }
    };

    controller.ServiceCommand = ServiceCommand;

}());