(function(){
    function ApplicationMediator() {
        puremvc.Mediator.call(this, this.constructor.NAME, new view.components.Application());
    }

    ApplicationMediator.prototype = Object.create(puremvc.Mediator.prototype);
    ApplicationMediator.prototype.constructor = ApplicationMediator;

    ApplicationMediator.prototype.onRegister = function() {
        var self = this;
        function IDelegate(){
            this.service = self.service.bind(self);
        }
        this.viewComponent.setDelegate(new IDelegate());
        this.viewComponent.creationComplete();
    };

    ApplicationMediator.prototype.service = function(requestVO) {
        this.sendNotification(ApplicationFacade.SERVICE, requestVO);
    };

    ApplicationMediator.prototype.listNotificationInterests = function() {
        return [
            ApplicationFacade.SERVICE_RESULT,
            ApplicationFacade.SERVICE_FAULT
        ];
    };

    ApplicationMediator.prototype.handleNotification = function(notification) {
        switch(notification.name) {
            case ApplicationFacade.SERVICE_RESULT:
                this.viewComponent.service_result(notification.body);
                break;
            case ApplicationFacade.SERVICE_FAULT:
                this.viewComponent.service_fault(notification.body);
                break;
        }
    };

    ApplicationMediator.NAME = 'ApplicationMediator';

    view.ApplicationMediator = ApplicationMediator;
}());