(function(){

    function ServiceProxy(data) {
        puremvc.Proxy.call(this, this.constructor.NAME, data);
        this.entitlement = new model.delegate.Entitlement();
    }

    ServiceProxy.prototype = Object.create(puremvc.Proxy.prototype);
    ServiceProxy.prototype.constructor = ServiceProxy;

    ServiceProxy.prototype.login = function(serviceRequest) {
        this.entitlement.signInWithCredentials(serviceRequest.getRequestVO())
            .then(this.result, this.fault);
    };

    ServiceProxy.prototype.result = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.RESULT, serviceRequest));
        }
    };

    ServiceProxy.prototype.fault = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.FAULT, serviceRequest));
        }
    };

    ServiceProxy.NAME = 'ServiceProxy';

    model.ServiceProxy = ServiceProxy;

}());