(function(){

    function BrandProxy(data) {
        puremvc.Proxy.call(this, this.constructor.NAME, data);
        this.brand = new model.delegate.Brand();
    }

    BrandProxy.prototype = Object.create(puremvc.Proxy.prototype);
    BrandProxy.prototype.constructor = BrandProxy;

    BrandProxy.prototype.get = function(serviceRequest) {
        this.brand.get(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    BrandProxy.prototype.post = function(serviceRequest) {
        this.brand.post(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    BrandProxy.prototype.delete = function(serviceRequest) {
        this.brand.delete(serviceRequest.getRequestVO())
            .then(this.result.bind(this, serviceRequest), this.fault.bind(this, serviceRequest));
    };

    BrandProxy.prototype.result = function(serviceRequest) {
        if(serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.RESULT, serviceRequest));
        }
    };

    BrandProxy.prototype.fault = function(serviceRequest) {
        if(serviceRequest .hasCallback && serviceRequest.hasCallback()) {
            serviceRequest.notifyObserver(new puremvc.Notification(model.request.ServiceRequest.FAULT, serviceRequest));
        } else {
            console.log(serviceRequest);
        }
    };

    BrandProxy.NAME = 'BrandProxy';

    model.BrandProxy = BrandProxy;

}());