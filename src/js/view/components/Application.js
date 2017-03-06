(function(){

    function Application() {
        location.hash = "";
        window.onhashchange = this.onhashchange.bind(this);
        this.popup = new view.components.Popup();
    }

    Application.prototype.requestConfirm = function(requestVO, message) {
        return this.popup.requestConfirm(requestVO, message);
    };

    Application.prototype.requestAlert = function(requestVO, message) {
        return this.popup.requestAlert(requestVO, message);
    };

    Application.prototype.onhashchange = function(event) {
    };

    view.components.Application = Application;

}());