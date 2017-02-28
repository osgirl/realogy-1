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

        switch(requestVO.getRequestData().getType()) {
            case AppConstants.DEVICE_READY:
                break;
            case AppConstants.AGENDA:
                break;
        }
    };

    ServiceCommand.prototype.result = function(notification) {
        var serviceRequest = notification.getBody();
        switch (notification.name) {
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