var controller = {};
var model = {vo: {}, request: {}, delegate: {}};
var view = {components: {}};

function ApplicationFacade(multitonKey) {
    puremvc.Facade.call(this, multitonKey);
}

ApplicationFacade.prototype = Object.create(puremvc.Facade.prototype);
ApplicationFacade.prototype.constructor = ApplicationFacade;

ApplicationFacade.prototype.initializeController = function() {
    puremvc.Facade.prototype.initializeController.call(this);
    this.registerCommand(ApplicationFacade.STARTUP, controller.StartupCommand);
};


ApplicationFacade.prototype.startup = function() {
    this.sendNotification(this.constructor.STARTUP);
};

ApplicationFacade.getInstance = function(multitonKey) {
    if(puremvc.Facade.instanceMap[multitonKey] == null) {
        puremvc.Facade.instanceMap[multitonKey] = new ApplicationFacade(multitonKey);
    }
    return puremvc.Facade.instanceMap[multitonKey];
};

ApplicationFacade.STARTUP = 'startup';

ApplicationFacade.ENTITLEMENT = 'entitlement';
ApplicationFacade.ENTITLEMENT_RESULT = 'entitlementResult';
ApplicationFacade.ENTITLEMENT_FAULT = 'entitlementFault';

ApplicationFacade.BRAND = 'brand';
ApplicationFacade.BRAND_RESULT = 'brandResult';
ApplicationFacade.BRAND_FAULT = 'brandFault';

ApplicationFacade.PRODUCT = 'product';
ApplicationFacade.PRODUCT_RESULT = 'productResult';
ApplicationFacade.PRODUCT_FAULT = 'productFault';