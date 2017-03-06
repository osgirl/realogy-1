(function(){

    function EntitlementProxy(data) {
        puremvc.Proxy.call(this, this.constructor.NAME, data);
        this.entitlement = new model.delegate.Entitlement();
    }

    EntitlementProxy.prototype = Object.create(puremvc.Proxy.prototype);
    EntitlementProxy.prototype.constructor = EntitlementProxy;

    EntitlementProxy.prototype.signInWithCredentials = function(serviceRequest) {
        this.entitlement.signInWithCredentials(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    EntitlementProxy.prototype.renewAuthToken = function(serviceRequest) {
        this.entitlement.renewAuthToken(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    EntitlementProxy.prototype.result = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.RESULT, serviceRequest));
        }
    };

    EntitlementProxy.prototype.fault = function(serviceRequest) {
        if(serviceRequest .hasCallback && serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.FAULT, serviceRequest));
        } else {
            console.log(serviceRequest);
        }
    };

    EntitlementProxy.NAME = 'EntitlementProxy';

    model.EntitlementProxy = EntitlementProxy;

}());