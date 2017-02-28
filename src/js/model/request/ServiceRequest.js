(function(){

    function ServiceRequest(requestVO, callback, caller) {
        puremvc.Observer.call(this, callback, caller);
        this.requestVO = requestVO;
    }

    ServiceRequest.prototype = Object.create(puremvc.Observer.prototype);
    ServiceRequest.prototype.constructor = ServiceRequest;

    ServiceRequest.prototype.setObserver = function(callback, caller) {
        this.setNotifyMethod(callback);
        this.setNotifyContext(caller);
    };

    ServiceRequest.prototype.hasCallback = function() {
        return this.getNotifyContext() && this.getNotifyContext();
    };

    ServiceRequest.prototype.getRequestVO = function() {
        return this.requestVO;
    };

    ServiceRequest.RESULT = 'result';
    ServiceRequest.FAULT = 'fault';

    model.request.ServiceRequest = ServiceRequest;

}());