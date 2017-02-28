(function(){

    function ResultData(data, error) {
        this.data = data;
        this.error = error;
    }

    ResultData.prototype.setData = function(data) {
        this.data = data;
    };

    ResultData.prototype.getData = function() {
        return this.data;
    };

    ResultData.prototype.setError = function(error) {
        this.error = error;
    };

    ResultData.prototype.getError = function() {
        return this.error;
    };

    model.vo.ResultData = ResultData;

})();