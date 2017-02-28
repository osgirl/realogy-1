(function(){

    function RequestVO(requestData) {
        this.requestData = requestData;
    }

    RequestVO.prototype.getRequestData = function() {
        return this.requestData;
    };

    RequestVO.prototype.setResultData = function(resultData) {
        this.resultData = resultData;
    };

    RequestVO.prototype.getResultData = function() {
        return this.resultData;
    };

    model.vo.RequestVO = RequestVO;

}());