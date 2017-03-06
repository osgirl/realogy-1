(function(){

    function StartupCommand(){
        puremvc.SimpleCommand.call(this);
    }

    StartupCommand.prototype = Object.create(puremvc.SimpleCommand.prototype);
    StartupCommand.prototype.constructor = StartupCommand;

    StartupCommand.prototype.execute = function(notification) {
        this.facade.registerCommand(ApplicationFacade.BRAND, controller.BrandCommand);
        this.facade.registerProxy(new model.BrandProxy());

        this.facade.registerCommand(ApplicationFacade.PRODUCT, controller.ProductCommand);
        this.facade.registerProxy(new model.ProductProxy());

        this.facade.registerMediator(new view.ApplicationMediator());
    };

    controller.StartupCommand = StartupCommand;

}());