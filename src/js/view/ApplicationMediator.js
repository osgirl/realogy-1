(function(){

    function ApplicationMediator() {
        puremvc.Mediator.call(this, this.constructor.NAME, new view.components.Application());
    }

    ApplicationMediator.prototype = Object.create(puremvc.Mediator.prototype);
    ApplicationMediator.prototype.constructor = ApplicationMediator;

    ApplicationMediator.prototype.onRegister = function() {
        this.facade.registerMediator(new view.BrandMediator());
        this.facade.registerMediator(new view.ProductMediator());
    };

    ApplicationMediator.prototype.requestConfirm = function(requestVO, message) {
        return this.viewComponent.requestConfirm(requestVO, message);
    };

    ApplicationMediator.prototype.requestAlert = function(requestVO, message) {
        return this.viewComponent.requestAlert(requestVO, message);
    };

    ApplicationMediator.NAME = 'ApplicationMediator';

    view.ApplicationMediator = ApplicationMediator;

}());