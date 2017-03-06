(function(){

    function ProductMediator() {
        puremvc.Mediator.call(this, this.constructor.NAME, new view.components.Product());
    }

    ProductMediator.prototype = Object.create(puremvc.Mediator.prototype);
    ProductMediator.prototype.constructor = ProductMediator;

    ProductMediator.prototype.onRegister = function() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
        }
        this.viewComponent.setDelegate(new IDelegate());
        this.viewComponent.initializeProduct();

    };

    ProductMediator.prototype.service = function(requestVO) {
        this.sendNotification(ApplicationFacade.PRODUCT, requestVO);
    };

    ProductMediator.prototype.listNotificationInterests = function() {
        return [
            ApplicationFacade.PRODUCT_RESULT,
            ApplicationFacade.PRODUCT_FAULT,
            ApplicationFacade.BRAND_RESULT
        ];
    };

    ProductMediator.prototype.handleNotification = function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.PRODUCT_RESULT:
                this.viewComponent.result(notification.getBody());
                break;
            case ApplicationFacade.PRODUCT_FAULT:
                this.viewComponent.fault(notification.getBody());
                break;
            case ApplicationFacade.BRAND_RESULT:
                this.viewComponent.render(notification.getBody());
                break;
        }
    };

    ProductMediator.NAME = 'ProductMediator';

    view.ProductMediator = ProductMediator;

}());