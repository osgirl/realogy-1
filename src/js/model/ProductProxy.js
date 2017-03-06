(function(){

    function ProductProxy() {
        puremvc.Proxy.call(this, this.constructor.NAME, null);
        this.product = new model.delegate.Product();
    }

    ProductProxy.prototype = Object.create(puremvc.Proxy.prototype);
    ProductProxy.prototype.constructor = ProductProxy;

    ProductProxy.prototype.get = function(serviceRequest) {
        this.product.get(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ProductProxy.prototype.post = function(serviceRequest) {
        this.product.post(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ProductProxy.prototype.delete = function(serviceRequest) {
        this.product.delete(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    ProductProxy.prototype.result = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.RESULT, serviceRequest));
        }
    };

    ProductProxy.prototype.fault = function(serviceRequest) {
        if(serviceRequest .hasCallback && serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.FAULT, serviceRequest));
        } else {
            console.log(serviceRequest);
        }
    };

    ProductProxy.NAME = 'ProductProxy';

    model.ProductProxy = ProductProxy;

}());