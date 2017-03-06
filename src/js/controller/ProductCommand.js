(function(){

    function ProductCommand() {
        puremvc.SimpleCommand.call(this);
    }

    ProductCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    ProductCommand.prototype.constructor = ProductCommand;

    ProductCommand.prototype.execute = function(notification) {
        var requestVO = notification.getBody();
        var serviceRequest = new model.request.ServiceRequest(requestVO, this.result, this);
        var productProxy = this.facade.retrieveProxy(model.ProductProxy.NAME);

        switch(requestVO.getRequestType()) {
            case AppConstants.GET:
                productProxy.get(serviceRequest);
                break;
            case AppConstants.DELETE:
                productProxy.delete(serviceRequest);
                break;
            default:
                console.log("Unknown Request - ProductCommand", requestVO);
                break;
        }
    };

    ProductCommand.prototype.result = function(notification) {
        var serviceRequest = notification.getBody();
        switch (notification.getName()) {
            case model.request.ServiceRequest.RESULT:
                this.sendNotification(ApplicationFacade.PRODUCT_RESULT, serviceRequest.getRequestVO());
                break;
            case model.request.ServiceRequest.FAULT:
                this.sendNotification(ApplicationFacade.PRODUCT_FAULT, serviceRequest.getRequestVO());
                break;
        }
    };

    controller.ProductCommand = ProductCommand;

})();