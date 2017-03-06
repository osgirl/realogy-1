(function(){

    function BrandMediator() {
        puremvc.Mediator.call(this, this.constructor.NAME, new view.components.Brand());
    }

    BrandMediator.prototype = Object.create(puremvc.Mediator.prototype);
    BrandMediator.prototype.constructor = BrandMediator;

    BrandMediator.prototype.onRegister = function() {
        var self = this;
        function IDelegate(){
            this.requestConfirm = self.requestConfirm.bind(self);
            this.service = self.service.bind(self);
        }
        this.viewComponent.setDelegate(new IDelegate());
        this.viewComponent.initializeBrand();
    };

    BrandMediator.prototype.requestConfirm = function(requestVO, message) {
        var applicationMediator = this.facade.retrieveMediator(view.ApplicationMediator.NAME);
        applicationMediator.requestConfirm(requestVO, message)
            .then(BrandMediator.prototype.service.bind(this));
    };

    BrandMediator.prototype.service = function(requestVO) {
        this.sendNotification(ApplicationFacade.BRAND, requestVO);
    };

    BrandMediator.prototype.listNotificationInterests = function() {
        return [
            ApplicationFacade.BRAND_RESULT,
            ApplicationFacade.BRAND_FAULT
        ];
    };

    BrandMediator.prototype.handleNotification = function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.BRAND_RESULT:
                this.viewComponent.result(notification.getBody());
                break;
            case ApplicationFacade.BRAND_FAULT:
                this.viewComponent.fault(notification.getBody());
                break;
        }
    };

    BrandMediator.NAME = 'BrandMediator';

    view.BrandMediator = BrandMediator;

}());