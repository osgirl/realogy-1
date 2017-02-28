(function(){

    function RequestData(data, type) {
        this.data = data;
        this.type = type;
    }

    RequestData.prototype.getData = function() {
        return this.data;
    };

    RequestData.prototype.getType = function() {
        return this.type;
    };

    model.vo.RequestData = RequestData;

})();