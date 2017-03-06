(function(){

    function ServiceProxy(data) {
        puremvc.Proxy.call(this, this.constructor.NAME, data);
        this.entitlement = new model.delegate.Entitlement();
        this.brand = new model.delegate.Brand();
        this.product = new model.delegate.Product();
    }

    ServiceProxy.prototype = Object.create(puremvc.Proxy.prototype);
    ServiceProxy.prototype.constructor = ServiceProxy;

    ServiceProxy.prototype.signInWithCredentials = function(serviceRequest) {
        this.entitlement.signInWithCredentials(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.renewAuthToken = function(serviceRequest) {
        this.entitlement.renewAuthToken(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.getBrands = function(serviceRequest) {
        this.brand.get(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.postBrands = function(serviceRequest) {
        this.brand.post(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.deleteBrands = function(serviceRequest) {
        this.brand.delete(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.getProducts = function(serviceRequest) {
        this.product.get(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.deleteProducts = function(serviceRequest) {
        this.product.delete(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ServiceProxy.prototype.result = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.RESULT, serviceRequest));
        }
    };

    ServiceProxy.prototype.fault = function(serviceRequest) {
        if(serviceRequest .hasCallback && serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.FAULT, serviceRequest));
        } else {
            console.log(serviceRequest);
        }
    };

    ServiceProxy.NAME = 'ServiceProxy';

    model.ServiceProxy = ServiceProxy;

}());