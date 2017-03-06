(function(){

    function BrandCommand(){
        puremvc.SimpleCommand.call(this);
    }

    BrandCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    BrandCommand.prototype.constructor = BrandCommand;

    BrandCommand.prototype.execute = function(notification) {
        var requestVO = notification.getBody();
        var serviceRequest = new model.request.ServiceRequest(requestVO, this.result, this);
        var serviceProxy = this.facade.retrieveProxy(model.BrandProxy.NAME);

        switch(requestVO.getRequestType()) {
            case AppConstants.GET:
                serviceProxy.get(serviceRequest);
                break;
            case AppConstants.POST:
                serviceProxy.post(serviceRequest);
                break;
            case AppConstants.DELETE:
                serviceProxy.delete(serviceRequest);
                break;
            default:
                console.log("Unknown Request - BrandCommand", requestVO);
                break;
        }
    };

    BrandCommand.prototype.result = function(notification) {
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

    controller.BrandCommand = BrandCommand;

}());