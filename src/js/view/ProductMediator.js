(function(){

    function ProductMediator() {
        puremvc.Mediator.call(this, this.constructor.NAME, new view.components.Product());
    }

    ProductMediator.prototype = Object.create(puremvc.Mediator.prototype);
    ProductMediator.prototype.constructor = ProductMediator;

    ProductMediator.prototype.onRegister = function() {
        var self = this;
        function IDelegate(){
            this.requestConfirm = self.requestConfirm.bind(self);
            this.service = self.service.bind(self);
        }
        this.viewComponent.setDelegate(new IDelegate());

    };

    ProductMediator.prototype.requestConfirm = function(requestVO, message) {
        var applicationMediator = this.facade.retrieveMediator(view.ApplicationMediator.NAME);
        applicationMediator.requestConfirm(requestVO, message)
            .then(ProductMediator.prototype.service.bind(this));
    };

    ProductMediator.prototype.service = function(requestVO) {
        this.sendNotification(ApplicationFacade.PRODUCT, requestVO);
    };

    ProductMediator.prototype.listNotificationInterests = function() {
        return [
            ApplicationFacade.BRAND_RESULT,
            ApplicationFacade.PRODUCT_RESULT,
            ApplicationFacade.PRODUCT_FAULT
        ];
    };

    ProductMediator.prototype.handleNotification = function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.BRAND_RESULT:
                this.viewComponent.appendBrands(notification.getBody());
                break;
            case ApplicationFacade.PRODUCT_RESULT:
                this.viewComponent.result(notification.getBody());
                break;
            case ApplicationFacade.PRODUCT_FAULT:
                this.viewComponent.fault(notification.getBody());
                break;
        }
    };

    ProductMediator.NAME = 'ProductMediator';

    view.ProductMediator = ProductMediator;

}());