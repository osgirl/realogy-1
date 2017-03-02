(function(){

    function RequestVO(requestData, requestType) {
        this.requestData = requestData;
        this.requestType = requestType;
    }

    RequestVO.prototype.getRequestData = function() {
        return this.requestData;
    };

    RequestVO.prototype.getRequestType = function() {
        return this.requestType;
    };

    RequestVO.prototype.setResultData = function(resultData) {
        this.resultData = resultData;
    };

    RequestVO.prototype.getResultData = function() {
        return this.resultData;
    };

    model.vo.RequestVO = RequestVO;

}());