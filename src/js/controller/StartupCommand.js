(function(){
    function StartupCommand(){
        puremvc.SimpleCommand.call(this);
    }

    StartupCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    StartupCommand.prototype.constructor = StartupCommand;

    StartupCommand.prototype.execute = function(notification) {
        this.facade.registerCommand(ApplicationFacade.SERVICE, controller.ServiceCommand);
        this.facade.registerProxy(new model.ServiceProxy());
        this.facade.registerMediator(new view.ApplicationMediator());
    };

    controller.StartupCommand = StartupCommand;
}());